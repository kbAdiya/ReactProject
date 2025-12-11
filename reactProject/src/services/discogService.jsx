const BASE_URL = "https://musicbrainz.org/ws/2/release-group";
const BASE_RELEASE_URL = "https://musicbrainz.org/ws/2";
const BTS_ID = "0d79fe8e-ba27-4859-bb8c-2f255f346853";

const HEADERS = {
  "User-Agent": "MyBTSApp/1.0 (me@example.com)",
  "Accept": "application/json"
};


async function getRGcover(rgId) {
  if (!rgId) return null;

  try {
    const res = await fetch(
      `https://coverartarchive.org/release-group/${rgId}/front-500`
    );

    return res.ok ? res.url : null;
  } catch {
    return null;
  }
}


export async function getAll(query = "", page = 1, limit, signal) {
  const offset = (page - 1) * limit;

  const typeQuery = `(primarytype:Album OR primarytype:EP)`;
  const baseQuery = `arid:${BTS_ID} AND ${typeQuery}`;

  let finalQuery = query ? `${baseQuery} AND "${query}"` : baseQuery;

  const url = `${BASE_URL}?query=${encodeURIComponent(
    finalQuery
  )}&limit=${limit}&offset=${offset}&fmt=json`;

  const res = await fetch(url, { headers: HEADERS, signal });
  if (!res.ok) throw new Error("Failed to load albums");

  const data = await res.json();

  const list = data["release-groups"] || [];


  const items = await Promise.all(
    list.map(async (item) => {
      const coverUrl = await getRGcover(item.id);

      return {
        id: item.id,
        title: item.title,
        date: item["first-release-date"] || "Unknown",
        type: item["primary-type"],
        coverUrl
      };
    })
  );

  return {
    total: data.count || 0,
    items
  };
}


export async function getById(id) {
  const rgUrl = `${BASE_URL}/${id}?inc=releases+artists+tags+genres&fmt=json`;

  const rgRes = await fetch(rgUrl, { headers: HEADERS });
  if (!rgRes.ok) throw new Error("Group not found");

  const album = await rgRes.json();

  album.coverUrl = await getRGcover(id);

 
  if (album.releases && album.releases.length > 0) {
    const releaseId = album.releases[0].id;

    const releaseRes = await fetch(
      `${BASE_RELEASE_URL}/release/${releaseId}?inc=recordings&fmt=json`,
      { headers: HEADERS }
    );

    if (releaseRes.ok) {
      const releaseData = await releaseRes.json();
      album.tracks = releaseData.media?.flatMap((m) => m.tracks) || [];
    }
  }

  return album;
}

