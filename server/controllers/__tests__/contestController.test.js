const { getUpdatedContestantsList } = require("../contestController");

describe("getUpdatedContestantsList", () => {
  it("awards points to the matching contestant only", async () => {
    const list = [
      { username: "alice", points: 10 },
      { username: "bob", points: 5 },
    ];

    const result = await getUpdatedContestantsList(list, "bob", 20);

    expect(result.find((c) => c.username === "bob").points).toBe(25);
    expect(result.find((c) => c.username === "alice").points).toBe(10);
  });

  it("sorts contestants by points descending and assigns sequential ranks", async () => {
    const list = [
      { username: "alice", points: 10 },
      { username: "bob", points: 5 },
      { username: "carol", points: 30 },
    ];

    const result = await getUpdatedContestantsList(list, "", 0);

    expect(result.map((c) => c.username)).toEqual(["carol", "alice", "bob"]);
    expect(result.map((c) => c.rank)).toEqual([1, 2, 3]);
  });
});
