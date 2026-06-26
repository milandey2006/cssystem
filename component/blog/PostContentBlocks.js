import Link from "next/link";

// Renders a post's structured content blocks with consistent typography.
// Kept block-based (not raw HTML) so styling is explicit and predictable.
export default function PostContentBlocks({ content }) {
  return (
    <div className="space-y-6">
      {content.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2 key={i} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-2">
              {block.text}
            </h2>
          );
        }

        if (block.type === "subheading") {
          return (
            <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-1">
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-blue-600 pl-4 italic text-gray-700 text-lg"
            >
              {block.text}
            </blockquote>
          );
        }

        // paragraph (default) — supports an optional inline link + suffix text
        return (
          <p key={i} className="text-gray-700 leading-relaxed text-lg">
            {block.text}
            {block.links?.map((link, j) => (
              <Link key={j} href={link.href} className="text-blue-600 hover:underline font-medium">
                {link.text}
              </Link>
            ))}
            {block.suffix}
          </p>
        );
      })}
    </div>
  );
}
