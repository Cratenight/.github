import { bench, describe } from "vitest";
import { renderApplicationRows } from "../dashboard.js";
import { renderDocumentHtml } from "../documents.js";

const statuses = ["pending", "approved", "rejected"];

function makeApplications(count, { unsafe = false } = {}) {
  return Array.from({ length: count }, (_, i) => ({
    id: `app-${i}`,
    name: unsafe ? `<b>Member "${i}" & 'co'</b>` : `Member ${i}`,
    applicantEmail: `member${i}@example.com`,
    status: statuses[i % statuses.length],
    purpose: unsafe
      ? `<script>alert('${i}')</script> Venue & booking for "night" ${i}`
      : `Booking request number ${i} for the next CRATE NIGHT event`,
    reviewNote: i % 2 === 0 ? `Reviewed <note> #${i} & approved` : "",
  }));
}

const small = makeApplications(10);
const medium = makeApplications(100);
const large = makeApplications(1000);
const unsafeMedium = makeApplications(100, { unsafe: true });

describe("dashboard renderApplicationRows", () => {
  const container = { innerHTML: "" };

  bench("empty list", () => {
    renderApplicationRows([], container);
  });

  bench("10 applications", () => {
    renderApplicationRows(small, container);
  });

  bench("100 applications", () => {
    renderApplicationRows(medium, container);
  });

  bench("1000 applications", () => {
    renderApplicationRows(large, container);
  });

  bench("100 applications with HTML-escaped content", () => {
    renderApplicationRows(unsafeMedium, container);
  });
});

describe("documents renderDocumentHtml", () => {
  const application = { id: "app-1", name: "Member One" };

  bench("id-card", () => {
    renderDocumentHtml("id-card", application, "doc-123");
  });

  bench("certificate", () => {
    renderDocumentHtml("certificate", application, "doc-123");
  });

  bench("100 certificates", () => {
    for (const app of medium) {
      renderDocumentHtml("certificate", app, app.id);
    }
  });
});
