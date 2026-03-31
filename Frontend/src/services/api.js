const API_BASE_URL = "http://127.0.0.1:8000";

export const api = {
  // Get the list of algorithms for the Sidebar
  getAlgorithms: async () => {
    const response = await fetch(`${API_BASE_URL}/api/algorithms`);
    return await response.json();
  },

  // Send data to be benchmarked
  runBenchmark: async (algoName, inputData) => {
    const response = await fetch(`${API_BASE_URL}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        algorithm: algoName,
        input: inputData
      }),
    });
    if (!response.ok) throw new Error("Backend Error");
    return await response.json();
  }
};