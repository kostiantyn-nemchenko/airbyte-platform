import { mockAttempt } from "test-utils/mock-data/mockAttempt";

import { AttemptRead, JobStatus } from "core/request/AirbyteClient";

import { isPartialSuccess } from "./isPartialSuccess";

describe(`${isPartialSuccess.name}`, () => {
  it("should return false if attempts is undefined", () => {
    expect(isPartialSuccess(undefined)).toBe(false);
  });

  it("should return true if at least one attempt is a partial success", () => {
    const attempts: AttemptRead[] = [
      {
        ...mockAttempt,
        status: JobStatus.failed,
        failureSummary: {
          partialSuccess: true,
          failures: [],
        },
      },
      {
        ...mockAttempt,
        status: JobStatus.failed,
      },
    ];

    expect(isPartialSuccess(attempts)).toBe(true);
  });

  it("should return false if no attempts are a partial success", () => {
    const attempts: AttemptRead[] = [
      {
        ...mockAttempt,
        status: JobStatus.failed,
      },
      {
        ...mockAttempt,
        status: JobStatus.failed,
      },
    ];

    expect(isPartialSuccess(attempts)).toBe(false);
  });
});
