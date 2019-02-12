const forceGraphSettings = {
  backgroundColor: "#24272B",
  nodeCanvasObject: (node, ctx, globalScale) => {
    // create circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#636971";
    ctx.fill();
    if (node.selected) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FFF";
      ctx.stroke();
    }

    // create label
    if (globalScale < 2) return;
    const label = node.name;
    const labelOffsetY = -9;
    ctx.font = `5px Sans-Serif`;
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "#24272B";
    ctx.lineWidth = 0.5;
    ctx.strokeText(label, node.x, node.y - labelOffsetY);
    ctx.fillStyle = "#636971";
    ctx.fillText(label, node.x, node.y - labelOffsetY);
  },
  linkCanvasObject: (link, ctx, globalScale) => {
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    if (link.source.selected || link.target.selected) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#FFF";
    } else {
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "#636971";
    }
    ctx.stroke();
  }
};

export default forceGraphSettings;
