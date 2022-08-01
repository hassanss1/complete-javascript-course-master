export const timeout = async function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function (_, reject) {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, seconds * 1000);
  });
};

export async function getJSON(id) {
  const response = await Promise.race([
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
    timeout(10),
  ]);
  const data = await response.json();

  if (!response.ok) throw new Error(`${data.message} ${response.status}`);
  return data;
}
