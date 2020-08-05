const Graph = ForceGraph()
    (document.getElementById('graph'))
    .graphData(data)
    .height(800)
    .width(800)
    .nodeId('id')
    .nodeAutoColorBy('group')
    .onNodeClick(node => {
        document.getElementById('card-container').innerHTML = '';
        const relevantInfo = errors.filter((error) => {
            return node.id === error.cwe
        })
        document.getElementById('card-container').innerHTML = `<h2 class="cwe-header" id='cwe'>${relevantInfo[0].cwe}</h2>`;
        document.getElementById('card-container').innerHTML += `<div id="accordion"></div>`;
        relevantInfo.forEach((item) => {
            const cardObject = `

            <div class="card">
                <div class="card-header" id="heading${relevantInfo.indexOf(item)}">
                    <h5 class="mb-0">
                        ${item.module_name} - ${item.title}
                    </h5>
                </div>

                <div id="collapse${relevantInfo.indexOf(item)}" class="collapsed" aria-labelledby="heading${relevantInfo.indexOf(item)}" data-parent="#accordion">
                    <div class="card-body">
                        <p class="card-text" id='cve'><b>CVEs:</b>${item.cves || "n/a"}</p>
                        <p class="card-text" id='title'><b>Title:</b>${item.title}</p>
                        <p class="card-text" id='severity' ><b>Severity:</b>${item.severity}</p>
                        <p class="card-text" id='overview'><b>Overview:</b>${item.overview}</p>
                        <p class="card-text" id='recommendation'><b>Recommendation:</b>${item.recommendation}</p>
                        <p class="card-text" id='reference'><b>References:</b>${item.references}</p>
                    </div>
                </div>
            </div>
        `
            document.getElementById('accordion').innerHTML += cardObject;
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
