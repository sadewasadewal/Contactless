import React from "react";

export default function EditorialSection() {
  return (
    <section className="editorial-section">
      <div className="container text-center">
        <blockquote className="editorial-quote">
          &ldquo;True technological perfection is when the physical boundary dissolves, leaving only{" "}
          <span className="font-script accent-script">pure intention</span> and immediate response.&rdquo;
        </blockquote>
        <div className="editorial-author">
          <div className="author-name">CONTACTLESS RESEARCH &amp; DESIGN LAB</div>
          <div className="author-title">Zurich &bull; Tokyo &bull; San Francisco</div>
        </div>
      </div>
    </section>
  );
}
