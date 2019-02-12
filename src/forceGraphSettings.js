const forceGraphSettings = {
  linkDirectionalParticles: 2,
  nodeCanvasObject: (node, ctx, globalScale) => {
    // create circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
    ctx.fill();

    // create label
    const label = node.name;
    const fontSize = globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(
      node.x - bckgDimensions[0] / 2,
      node.y - bckgDimensions[1] / 2,
      ...bckgDimensions
    );
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = node.color;
    ctx.fillText(label, node.x, node.y);
  }
};

export default forceGraphSettings;
