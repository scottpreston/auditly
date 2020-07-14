    const Graph = ForceGraph()
    (document.getElementById('graph'))
    .graphData(window.graphData)
    .nodeId('id')
    .nodeVal('val')
    .nodeLabel('id')
    .nodeAutoColorBy('group')
    .linkSource('source')
    .linkTarget('target')
        .nodeId('id')
        .nodeAutoColorBy('group')
        .nodeCanvasObject((node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 14/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
          ctx.fillStyle = 'white';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = node.color;
          ctx.fillText(label, node.x, node.y);
    }); 