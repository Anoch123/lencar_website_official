export function renderRichText(node: any): React.ReactNode {
  if (!node) return null;

  if (node.nodeType === "document") {
    return node.content.map((child: any, i: number) => (
      <div key={i}>{renderRichText(child)}</div>
    ));
  }

  if (node.nodeType === "paragraph") {
    return (
      <p className="mt-5 font-body text-[17px] leading-[1.8] text-[#3a3a3d]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </p>
    );
  }

  if (node.nodeType === "heading-1") {
    return (
      <h1 className="font-display mt-12 text-[32px] font-black uppercase italic leading-tight tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h1>
    );
  }

  if (node.nodeType === "heading-2") {
    return (
      <h2 className="font-display mt-10 text-[26px] font-black uppercase italic leading-tight tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h2>
    );
  }

  if (node.nodeType === "heading-3") {
    return (
      <h3 className="font-display mt-8 text-[20px] font-bold uppercase tracking-tight text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </h3>
    );
  }

  if (node.nodeType === "unordered-list" || node.nodeType === "ordered-list") {
    const Tag = node.nodeType === "ordered-list" ? "ol" : "ul";
    return (
      <Tag className="mt-5 space-y-2 pl-1 font-body text-[17px] leading-[1.8] text-[#3a3a3d]">
        {node.content.map((child: any, i: number) => (
          <li key={i} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F4C81]" />
            <span>{renderRichText(child)}</span>
          </li>
        ))}
      </Tag>
    );
  }

  if (node.nodeType === "list-item") {
    return (
      <>
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </>
    );
  }

  if (node.nodeType === "blockquote") {
    return (
      <blockquote className="mt-6 border-l-[3px] border-[#0F4C81] pl-5 font-body text-[18px] italic leading-relaxed text-[#0b0b0c]">
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </blockquote>
    );
  }

  if (node.nodeType === "hr") {
    return <hr className="my-10 border-t border-[#0b0b0c]/10" />;
  }

  if (node.nodeType === "hyperlink") {
    return (
      <a
        href={node.data?.uri}
        className="font-medium text-[#0F4C81] underline decoration-[#0F4C81]/30 underline-offset-2 hover:decoration-[#0F4C81]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.content.map((child: any, i: number) => (
          <span key={i}>{renderRichText(child)}</span>
        ))}
      </a>
    );
  }

  if (node.nodeType === "text") {
    let text: React.ReactNode = node.value;

    if (node.marks?.some((m: any) => m.type === "bold")) {
      text = <strong className="font-semibold text-[#0b0b0c]">{text}</strong>;
    }
    if (node.marks?.some((m: any) => m.type === "italic")) {
      text = <em>{text}</em>;
    }
    if (node.marks?.some((m: any) => m.type === "code")) {
      text = (
        <code className="rounded bg-[#f7f7f8] px-1.5 py-0.5 font-mono text-[15px] text-[#0b0b0c]">
          {text}
        </code>
      );
    }

    return text;
  }

  return null;
}