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
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${relevantInfo.indexOf(item)}" aria-expanded="false" aria-controls="collapse${relevantInfo.indexOf(item)}">
                        ${item.title}
                    </button>
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


// `
// <div id="accordion">
//   <div class="card">
//     <div class="card-header" id="headingOne">
//       <h5 class="mb-0">
//         <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//           Collapsible Group Item #1
//         </button>
//       </h5>
//     </div>

//     <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
//       <div class="card-body">
//         Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
//       </div>
//     </div>
//   </div>
// </div
//     `



// `
//     <div class="card">

//             <div class="card-body" >
//                 <p class="card-text" id='cve'><b>CVEs:</b>${item.cves || "n/a"}</p>
//                 <p class="card-text" id='title'><b>Title:</b>${item.title}</p>
//                 <p class="card-text" id='severity' ><b>Severity:</b>${item.severity}</p>
//                 <p class="card-text" id='overview'><b>Overview:</b>${item.overview}</p>
//                 <p class="card-text" id='recommendation'><b>Recommendation:</b>${item.recommendation}</p>
//                 <p class="card-text" id='reference'><b>References:</b>${item.references}</p>
//             </div>
//         </div>
//     `
