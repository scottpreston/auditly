const Graph = ForceGraph()
    (document.getElementById('graph'))
    .graphData(data)
    .nodeId('id')
    .nodeAutoColorBy('group')
    .onNodeClick(node => {
        document.getElementById('card-container').innerHTML = '';
        const relevantInfo = errors.filter((error) => {
            return node.id === error.cwe
        })
        relevantInfo.forEach((item) => {
            const cardObject = `
            <div class="card text-center">
            <div class="card-header">
                <h5 class="card-title" id='cwe'>${item.cwe}</h5>
            </div>
            <div class="card-body" >
                <p class="card-text" id='cve'>CVEs:${item.cves}</p>
                <p class="card-text" id='title'>Title:${item.title}</p>
                <p class="card-text" id='severity' >Severity:${item.severity}</p>
                <p class="card-text" id='overview'>Overview:${item.overview}</p>
                <p class="card-text" id='recommendation'>Recommendation:${item.recommendation}</p>
            </div>
        `
            document.getElementById('card-container').innerHTML += cardObject;
        })
    })
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);
    });
