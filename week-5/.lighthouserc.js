module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      // startServerCommand: "npm run start", // 서버를 키는 명령어를 통해서도 실행 가능
      url: ["http://localhost:5174"],
      numberOfRuns: 5,
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};