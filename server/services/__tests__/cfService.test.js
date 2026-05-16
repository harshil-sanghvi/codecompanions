jest.mock("axios", () => ({ request: jest.fn() }));

const axios = require("axios");
const { getUpdatedRankList } = require("../cfService");

const submissionsResponse = (results) => ({
  data: { status: "OK", result: results },
});

describe("getUpdatedRankList", () => {
  afterEach(() => jest.clearAllMocks());

  it("picks the earliest accepted submission as the winner of each problem", async () => {
    axios.request.mockImplementation((config) => {
      if (config.params.handle === "alice") {
        return Promise.resolve(
          submissionsResponse([
            { verdict: "OK", problem: { name: "P1" }, creationTimeSeconds: 100 },
          ])
        );
      }
      return Promise.resolve(
        submissionsResponse([
          { verdict: "OK", problem: { name: "P1" }, creationTimeSeconds: 50 },
          { verdict: "OK", problem: { name: "P2" }, creationTimeSeconds: 200 },
        ])
      );
    });

    const liveContest = {
      contestants: [{ username: "alice" }, { username: "bob" }],
      problems: [
        { name: "P1", isSolved: false },
        { name: "P2", isSolved: false },
      ],
    };

    const result = await getUpdatedRankList(liveContest);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        { problemName: "P1", username: "bob", timeStamp: 50 },
        { problemName: "P2", username: "bob", timeStamp: 200 },
      ])
    );
  });

  it("ignores non-accepted submissions", async () => {
    axios.request.mockResolvedValue(
      submissionsResponse([
        {
          verdict: "WRONG_ANSWER",
          problem: { name: "P1" },
          creationTimeSeconds: 10,
        },
      ])
    );

    const liveContest = {
      contestants: [{ username: "alice" }],
      problems: [{ name: "P1", isSolved: false }],
    };

    expect(await getUpdatedRankList(liveContest)).toEqual([]);
  });

  it("skips problems that are already solved", async () => {
    axios.request.mockResolvedValue(submissionsResponse([]));

    const liveContest = {
      contestants: [{ username: "alice" }],
      problems: [{ name: "P1", isSolved: true }],
    };

    expect(await getUpdatedRankList(liveContest)).toEqual([]);
  });
});
