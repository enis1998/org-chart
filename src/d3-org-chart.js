!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e(exports, require("d3-selection"), require("d3-array"), require("d3-hierarchy"), require("d3-zoom"), require("d3-flextree"), require("d3-shape"), require("d3-drag")) : "function" == typeof define && define.amd ? define(["exports", "d3-selection", "d3-array", "d3-hierarchy", "d3-zoom", "d3-flextree", "d3-shape", "d3-drag"], e) : e(t.d3 = t.d3 || {}, t.d3, t.d3, t.d3, t.d3, t.d3, t.d3, t.d3) }(this, function (t, e, a, n, o, d, i, s) {
    "use strict"; const M = { selection: e.selection, select: e.select, selectAll: e.selectAll, max: a.max, min: a.min, sum: a.sum, cumsum: a.cumsum, tree: n.tree, stratify: n.stratify, zoom: o.zoom, zoomIdentity: o.zoomIdentity, linkHorizontal: i.linkHorizontal, drag: s.drag , data: null, sourceNode: null, targetNode: null, a: null}; t.OrgChart = class {
        constructor() {
            const a = {
                id: `ID${Math.floor(1e6 * Math.random())}`, firstDraw: true, svgWidth: 800, svgHeight: window.innerHeight - 100, scaleExtent: [.001, 20], container: "body", defaultTextFill: "#2C3E50", defaultFont: "Helvetica", ctx: document.createElement("canvas").getContext("2d"), data: null, duration: 400, setActiveNodeCentered: !0, expandLevel: 1, compact: !0, rootMargin: 40, nodeDefaultBackground: "none", connections: [], lastTransform: { x: 0, y: 0, k: 1 }, nodeSectionId: t => t.nodeSectionId || t.sectionId, nodeId: t => t.nodeId || t.id, parentNodeId: t => t.parentNodeId || t.parentId, backgroundColor: "none", zoomBehavior: null, defs: function (a, t) {
                    return `<defs>
                    ${t.map(t => {
                        var e = this.getTextWidth(t.label, { ctx: a.ctx, fontSize: 2, defaultFont: a.defaultFont }); return `
                       <marker id="${t.from + "_" + t.to}" refX="${t._source.x < t._target.x ? -7 : 7}" refY="5" markerWidth="500"  markerHeight="500"  orient="${t._source.x < t._target.x ? "auto" : "auto-start-reverse"}" >
                       <rect rx=0.5 width=${t.label ? e + 3 : 0} height=3 y=1  fill="#152785"></rect>
                       <text font-size="2px" x=1 fill="white" y=3>${t.label || ""}</text>
                       </marker>

                       <marker id="arrow-${t.from + "_" + t.to}"  markerWidth="500"  markerHeight="500"  refY="2"  refX="1" orient="${t._source.x < t._target.x ? "auto" : "auto-start-reverse"}" >
                       <path transform="translate(0)" d='M0,0 V4 L2,2 Z' fill='#152785' />
                       </marker>
                    `}).join(
                      enter => enter
                        .append("g")
                        .attr("class", "node")
                        .attr("transform", d => `translate(${d.x},${d.y})`)
                        .call(drag(attrs))
                        .call(g => g.append("circle").attr("r", attrs.nodeSize))
                        .call(g => g.append("text").text(d => d.data.name).attr("y", 5))
                        .on("click", (event, d) => {
                          const newName = prompt("Enter new name:", d.data.name);
                          if (newName !== null) {
                            this.editNode(attrs.nodeId(d.data), newName);
                          }
                        }),
                      update => update
                        .call(g => g.transition().attr("transform", d => `translate(${d.x},${d.y})`))
                    )};
                    </defs>
                    `}, 
                    //For add new link 
                    connectionsUpdate: function (t, e, a) { M.select(this).attr("stroke", t => "#000000").attr("stroke-linecap", "round").attr("stroke-width", t => "1").attr("pointer-events", "none").attr("marker-start", t => `url(#${t.from + "_" + t.to})`).attr("marker-end", t => `url(#arrow-${t.from + "_" + t.to})`) }, linkUpdate: function (t, e, a) { M.select(this).attr("stroke", t => t.data._upToTheRootHighlighted ? "#152785" : "lightgray").attr("stroke-width", t => t.data._upToTheRootHighlighted ? 5 : 2), t.data._upToTheRootHighlighted && M.select(this).raise() }, nodeUpdate: function (t, e, a) { M.select(this).select(".node-rect").attr("stroke", t => t.data._highlighted || t.data._upToTheRootHighlighted ? "#152785" : "none").attr("stroke-width", t.data._highlighted || t.data._upToTheRootHighlighted ? 10 : 1) }, svg: null, dragHandler: null, refresh: this, descendants: null, layout: t => layoutValue, nodeWidth: t => generalManagerWidth, nodeHeight: t => generalManagerHeight, nodeWidth: t => managerWidth, nodeHeight: t => managerHeight, nodeWidth: t => managerWidth, chiefWidth: t => chiefHeight, nodeWidth: t => managerWidth, engineerWidth: t => engineerHeight, nodeWidth: t => generalManagerWidth, nodeHeight: t => generalManagerHeight, nodeWidth: t => orgNodeWidth, nodeHeight: t => orgNodeHeight, siblingsMargin: t => siblingsMarginValue, childrenMargin: t => childrenMarginValue, neightbourMargin: (t, e) => neightbourMarginValue, compactMarginPair: t => compactMarginPairValue, compactMarginBetween: t => compactMarginBetweenValue, onNodeClick: t => t, onDrop: (dropData) => dropData, linkGroupArc: M.linkHorizontal().x(t => t.x).y(t => t.y), nodeContent: t => `<div style="padding:25px;font-size:10px;">Sample Node(id=${t.id}), override using <br/> <br/> 
            <code>chart<br/>
            &nbsp;.nodeContent({data}=>{ <br/>
             &nbsp;&nbsp;&nbsp;&nbsp;return '' // Custom HTML <br/>
             &nbsp;})</code>
             <br/> <br/>
             Or check different <a href="https://github.com/bumbeishvili/org-chart#jump-to-examples" target="_blank">layout examples</a>
             
             </div>`, 
             layout: layoutValue,
             buttonContent: ({ node: n, state: e }) => { return `<div style="border-radius:3px;padding:3px;font-size:10px;margin:auto auto;background-color:lightgray"> ${{ left: t => t ? '<div style="margin-top:-10px;line-height:1.2;font-size:25px;height:22px">‹</div>' : '<div style="margin-top:-10px;font-size:25px;height:23px">›</div>', bottom: t => t ? '<div style="margin-top:-20px;font-size:25px">ˬ</div>' : '<div style="margin-top:0px;line-height:1.2;height:11px;font-size:25px">ˆ</div>', right: t => t ? '<div style="margin-top:-10px;font-size:25px;height:23px">›</div>' : '<div style="margin-top:-10px;line-height:1.2;font-size:25px;height:22px">‹</div>', top: t => t ? '<div style="margin-top:0px;line-height:1.2;height:11px;font-size:25px">ˆ</div>' : '<div style="margin-top:-20px;font-size:25px">ˬ</div>' }[e.layout](n.children)}  </div>` }, 
             layoutBindings: {
              left: {
                nodeLeftX: (t) => 0,
                nodeRightX: (t) => t.width,
                nodeTopY: (t) => -t.height / 2,
                nodeBottomY: (t) => t.height / 2,
                nodeJoinX: (t) => t.x + t.width,
                nodeJoinY: (t) => t.y - t.height / 2,
                linkJoinX: (t) => t.x + t.width,
                linkJoinY: (t) => t.y,
                linkX: (t) => t.x,
                linkY: (t) => t.y,
                linkCompactXStart: (t) => t.x + t.width / 2,
                linkCompactYStart: (t) =>
                  t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                compactLinkMidX: (t, e) => t.firstCompactNode.x,
                compactLinkMidY: (t, e) =>
                  t.firstCompactNode.y +
                  t.firstCompactNode.flexCompactDim[0] / 4 +
                  e.compactMarginPair(t) / 4,
                linkParentX: (t) => t.parent.x + t.parent.width,
                linkParentY: (t) => t.parent.y,
                buttonX: (t) => t.width,
                buttonY: (t) => t.height / 2,
                centerTransform: ({ rootMargin: t, centerY: e, scale: a }) =>
                  `translate(${t},${e}) scale(${a})`,
                compactDimension: {
                  sizeColumn: (t) => t.height,
                  sizeRow: (t) => t.width,
                  reverse: (t) => t.slice().reverse(),
                },
                nodeFlexSize: ({
                  height: t,
                  width: e,
                  siblingsMargin: a,
                  childrenMargin: n,
                  state: o,
                  node: i,
                }) => {
                  return o.compact && i.flexCompactDim
                    ? [i.flexCompactDim[0], i.flexCompactDim[1]]
                    : [t + a, e + n];
                },
                zoomTransform: ({ centerY: t, scale: e }) =>
                  `translate(0,${t}) scale(${e})`,
                diagonal: this.hdiagonal.bind(this),
                swap: (t) => {
                  var e = t.x;
                  (t.x = t.y), (t.y = e);
                },
                nodeUpdateTransform: ({ x: t, y: e, height: a }) =>
                  `translate(${t},${e - a / 2})`,
              },
              top: {
                nodeLeftX: (t) => {
                  if (t.data.office === 'left') {
                    return -t.width / 2; // Adjust the value based on your requirements
                  } else if (t.data.office === 'right') {
                    return -t.width / 2; // Adjust the value based on your requirements
                  } else {
                    return -t.width / 2;
                  }
                },
                nodeRightX: (t) => {
                  if (t.data.office === 'left') {
                    return t.width / 2; // Adjust the value based on your requirements
                  } else if (t.data.office === 'right') {
                    return t.width / 2; // Adjust the value based on your requirements
                  } else {
                    return t.width / 2;
                  }
                },
                nodeTopY: (t) => {
                  if (t.data.office === 'left' || t.data.office === 'right') {
                    return 0;
                  } else {
                    return 0;
                  }
                },
                nodeBottomY: (t) => {
                  if (t.data.office === 'left' || t.data.office === 'right') {
                    return t.height;
                  } else {
                    return t.height;
                  }
                },
                nodeJoinX: (t, e) => {
                  var office = t.data === undefined ? t._source.data.office : t.data.office;
                  if (office === 'left') {
                    return t.x - t.width / 2; // Adjust the value based on your requirements
                  } else if (office === 'right') {
                    return t.x - t.width / 2; // Adjust the value based on your requirements
                  } else {
                    return t.x - t.width / 2;
                  }
                }, 
                nodeJoinY: (t) => {
                  var office = t.data === undefined ? t._source.data.office : t.data.office;
                  if (office === 'left') {
                    return t.y + t.height;
                  } else if (office === 'right') {
                    return t.y + t.height;
                  } else {
                    return t.y + t.height;
                  }
                }, 
                linkJoinX: (t) => {//It affects drawing
                  var office = t.data === undefined ? t._source.data.office : t.data.office;
                  //console.log(t);
                  if (office === 'left') {
                    return t.x + t.width / 2; // Adjust the value based on your requirements
                  } else if (office === 'right') {
                    return t.x; // Adjust the value based on your requirements
                  } else {
                    return t.x;
                  }
                },
                linkJoinY: (t) => {//It affects drawing
                  var office = t.data === undefined ? t._source.data.office : t.data.office;                
                  if (office === 'left') {
                    return t.y + t.height / 2;
                  } else if (office === 'right') {
                    return t.y + t.height;
                  } else {
                    return t.y + t.height;
                  }
                }, 
                linkCompactXStart: (t) => {//It affects drawing
                  if (t.data.office === 'left') {
                    return t.x + (t.compactEven ? t.width / 2 : -t.width / 2); // Adjust the value based on your requirements
                  } else if (t.data.office === 'right') {
                    return t.x + (t.compactEven ? t.width / 2 : -t.width / 2); // Adjust the value based on your requirements
                  } else {
                    return t.x + (t.compactEven ? t.width / 2 : -t.width / 2);
                  }
                },
                linkCompactYStart: (t, state) => {//It affects drawing
                  if (t.data.office === 'left' || t.data.office === 'right') {
                    return t.y + t.height / 2;
                  } else {
                    return t.y + t.height / 2;
                  }
                }, 
                compactLinkMidX: (t, e) => {//It affects drawing
                  if (t.data.office === 'left') {
                    return t.x + t.width * 1;
                  } else if (t.data.office === 'right') {
                    return t.x + t.width * 1.5;
                  } else {
                    return t.firstCompactNode.x +
                    t.firstCompactNode.flexCompactDim[0] / 4 +
                    e.compactMarginPair(t) / 4;
                  }
                },
                compactLinkMidY: (t, e) => {//It affects drawing
                  if (t.data.office === 'left') {
                    return t.y + t.height;
                  } else if (t.data.office === 'right') {
                    return t.y;
                  } else {
                    return t.firstCompactNode.y;
                  }
                },
                compactDimension: {
                  
                  sizeColumn: (t) => {
                    if (t.data.office === 'left' || t.data.office === 'right') {
                      return t.width;
                    } else {
                      return t.width;
                    }
                  },
                  sizeRow: (t) => {
                    if (t.data.office === 'left' || t.data.office === 'right') {
                      return t.height;
                    } else {
                      return t.height;
                    }
                  },
                  reverse: (t) => {
                    if (t.data.office === 'left' || t.data.office === 'right') {
                      return t;
                    } else {
                      return t;
                    }
                  },
                },
                linkX: (t) => {
                  var office = t.data === undefined ? t._source.data.office : t.data.office;                
                  if (office === 'left') {
                   return t.x + t.width / 2; // Adjust the value based on your requirements
                 } else if (office === 'right') {
                  return t.x + t.width / 2; // Adjust the value based on your requirements
                } else {
                   return t.x;
                 }
               },
                linkY: (t) => {
                  var office = t.data === undefined ? t._source.data.office : t.data.office;                
                   if (office === 'left') {
                    return t.y + t.height / 2; // Adjust the value based on your requirements
                  } else if (office === 'right') {
                    return t.y + t.height / 2; // Adjust the value based on your requirements
                  } else {
                    return t.y;
                  }
                }, 
                linkParentX: (t) => {//linker x axes change
                  var office = t.data === undefined ? t._source.data.office : t.data.office;                
                  if (office === 'left') {
                    return t.parent.x; // Adjust the value based on your requirements
                  } else if (office === 'right') {
                    return t.parent.x; // Adjust the value based on your requirements
                  } else {
                    return t.parent.x;
                  }
                }, 
                linkParentY: (t) => {//linker y axes change
                  var office = t.data === undefined ? t._source.data.office : t.data.office;                
                  if (office === 'left' || office === 'right') {
                    return t.parent.y + t.parent.height;
                  } else {
                    return t.parent.y + t.parent.height;
                  }
                }, 
                buttonX: (t, e) => {
                  if (a.data.office === 'left') {
                    return t.width; // Adjust the value based on your requirements
                  } else if (a.data.office === 'right') {
                    return 0; // Adjust the value based on your requirements
                  } else {
                    return t.width / 2;
                  }
                }, 
                buttonY: (t) => {
                  if (a.data.office === 'left' || a.data.office === 'right') {
                    return 0;
                  } else {
                    return t.height;
                  }
                }, 
                centerTransform: ({ rootMargin: t, scale: s, centerX: x, centerY: e, chartWidth: n}) => { 
                  if (a.data.office === 'right') {
                    return`translate(${x},${t}) scale(${s})`;
                  } else if (a.data.office === 'left') {
                    return `translate(${x},${t}) scale(${s})`;
                  } else {
                    return `translate(${x},${t}) scale(${s})`;
                  }
                },
                nodeFlexSize: ({
                  height: t,
                  width: e,
                  siblingsMargin: a,
                  childrenMargin: n,
                  state: o,
                  node: i,
                }) => {
                  if (i.data.office === 'left' || i.data.office === 'right') {
                    return o.compact && i.flexCompactDim
                    ? [i.flexCompactDim[0], i.flexCompactDim[1]]
                    : [e + a, t + n];
                  } 
                  else {
                    return o.compact && i.flexCompactDim
                  ? [i.flexCompactDim[0], i.flexCompactDim[1]]
                  : [e + a, t + n];
                  }
                },
                zoomTransform: ({ centerX: t, scale: e }) => {
                  if (a.data.office === 'right' || a.data.office === 'left') {
                    return `translate(${t},0}) scale(${e})`;
                  } else {
                    return `translate(${t},0}) scale(${e})`;
                  }
                },
                diagonal: this.diagonal.bind(this),
                swap: (t) => {
                  var e = t.x;
                  if (t.data.office === "left" || t.data.office == "right") {
                    return {};
                  }//(t.x = t.parent.x - t.width * 1.5), (t.y = t.parent.y);
                  else {
                    return {}
                  }
                },
                nodeUpdateTransform: (t) => {
                  if (t.data.office === 'right') {
                    return `translate(${t.parent.x - t.width * 2},${t.parent.y})`;
                  } else if (t.data.office === 'left') {
                    return  `translate(${t.x - t.width / 2},${t.y})`;
                  } else {
                    return `translate(${t.x - t.width / 2},${t.y})`;
                  }
                },
              },
              bottom: {
                nodeLeftX: (t) => -t.width / 2,
                nodeRightX: (t) => t.width / 2,
                nodeTopY: (t) => -t.height,
                nodeBottomY: (t) => 0,
                nodeJoinX: (t) => t.x - t.width / 2,
                nodeJoinY: (t) => t.y - t.height - t.height,
                linkJoinX: (t) => t.x,
                linkJoinY: (t) => t.y - t.height,
                linkCompactXStart: (t) =>
                  t.x + (t.compactEven ? t.width / 2 : -t.width / 2),
                linkCompactYStart: (t) => t.y - t.height / 2,
                compactLinkMidX: (t, e) =>
                  t.firstCompactNode.x +
                  t.firstCompactNode.flexCompactDim[0] / 4 +
                  e.compactMarginPair(t) / 4,
                compactLinkMidY: (t) => t.firstCompactNode.y,
                linkX: (t) => t.x,
                linkY: (t) => t.y,
                compactDimension: {
                  sizeColumn: (t) => t.width,
                  sizeRow: (t) => t.height,
                  reverse: (t) => t,
                },
                linkParentX: (t) => t.parent.x,
                linkParentY: (t) => t.parent.y - t.parent.height,
                buttonX: (t) => t.width / 2,
                buttonY: (t) => 0,
                centerTransform: ({
                  rootMargin: t,
                  scale: e,
                  centerX: a,
                  chartHeight: n,
                }) => `translate(${a},${n - t}) scale(${e})`,
                nodeFlexSize: ({
                  height: t,
                  width: e,
                  siblingsMargin: a,
                  childrenMargin: n,
                  state: o,
                  node: i,
                }) => {
                  return o.compact && i.flexCompactDim
                    ? [i.flexCompactDim[0], i.flexCompactDim[1]]
                    : [e + a, t + n];
                },
                zoomTransform: ({ centerX: t, scale: e }) =>
                  `translate(${t},0}) scale(${e})`,
                diagonal: this.diagonal.bind(this),
                swap: (t) => {
                  t.y = -t.y;
                },
                nodeUpdateTransform: ({ x: t, y: e, width: a, height: n }) =>
                  `translate(${t - a / 2},${e - n})`,
              },
              right: {
                nodeLeftX: (t) => -t.width,
                nodeRightX: (t) => 0,
                nodeTopY: (t) => -t.height / 2,
                nodeBottomY: (t) => t.height / 2,
                nodeJoinX: (t) => t.x - t.width - t.width,
                nodeJoinY: (t) => t.y - t.height / 2,
                linkJoinX: (t) => t.x - t.width,
                linkJoinY: (t) => t.y,
                linkX: (t) => t.x,
                linkY: (t) => t.y,
                linkParentX: (t) => t.parent.x - t.parent.width,
                linkParentY: (t) => t.parent.y,
                buttonX: (t) => 0,
                buttonY: (t) => t.height / 2,
                linkCompactXStart: (t) => t.x - t.width / 2,
                linkCompactYStart: (t) =>
                  t.y + (t.compactEven ? t.height / 2 : -t.height / 2),
                compactLinkMidX: (t, e) => t.firstCompactNode.x,
                compactLinkMidY: (t, e) =>
                  t.firstCompactNode.y +
                  t.firstCompactNode.flexCompactDim[0] / 4 +
                  e.compactMarginPair(t) / 4,
                centerTransform: ({
                  rootMargin: t,
                  centerY: e,
                  scale: a,
                  chartWidth: n,
                }) => `translate(${n - t},${e}) scale(${a})`,
                nodeFlexSize: ({
                  height: t,
                  width: e,
                  siblingsMargin: a,
                  childrenMargin: n,
                  state: o,
                  node: i,
                }) => {
                  return o.compact && i.flexCompactDim
                    ? [i.flexCompactDim[0], i.flexCompactDim[1]]
                    : [t + a, e + n];
                },
                compactDimension: {
                  sizeColumn: (t) => t.height,
                  sizeRow: (t) => t.width,
                  reverse: (t) => t.slice().reverse(),
                },
                zoomTransform: ({ centerY: t, scale: e }) =>
                  `translate(0,${t}) scale(${e})`,
                diagonal: this.hdiagonal.bind(this),
                swap: (t) => {
                  var e = t.x;
                  (t.x = -t.y), (t.y = e);
                },
                nodeUpdateTransform: ({ x: t, y: e, width: a, height: n }) =>
                  `translate(${t - a},${e - n / 2})`,
              },
            },
            }; this.getChartState = () => a, Object.keys(a).forEach(e => { this[e] = function (t) { return arguments.length ? (a[e] = t, this) : a[e] } }), this.initializeEnterExitUpdatePattern()
        } initializeEnterExitUpdatePattern() { M.selection.prototype.patternify = function (t) { var e = t.selector, a = t.tag, t = t.data || [e], t = this.selectAll("." + e).data(t, (t, e) => "object" == typeof t && t.id ? t.id : e); return t.exit().remove(), (t = t.enter().append(a).merge(t)).attr("class", e), t } } getNodeChildren({ data: t, children: e, _children: a }, n) { return n.push(t), e && e.forEach(t => { this.getNodeChildren(t, n) }), a && a.forEach(t => { this.getNodeChildren(t, n) }), n } initialZoom(t) { const e = this.getChartState(); return e.lastTransform.k = t, this } render() { const i = this.getChartState(); if (!i.data || 0 == i.data.length) return console.log("ORG CHART - Data is empty"), this; const t = M.select(i.container); var e = t.node().getBoundingClientRect();  0 < e.width && (i.svgWidth = e.width); const a = { id: `ID${Math.floor(1e6 * Math.random())}`, chartWidth: i.svgWidth, chartHeight: i.svgHeight }; if (i.calc = a, a.centerX = a.chartWidth / 2, a.centerY = a.chartHeight / 2, i.firstDraw) { const r = { zoom: null }; r.zoom = M.zoom().on("zoom", (t, e) => this.zoomed(t, e)).scaleExtent(i.scaleExtent), i.zoomBehavior = r.zoom } i.flexTreeLayout = d.flextree({ nodeSize: t => { var e = i.nodeWidth(t), a = i.nodeHeight(t), n = i.siblingsMargin(t), o = i.childrenMargin(t); return i.layoutBindings[i.layout].nodeFlexSize({ state: i, node: t, width: e, height: a, siblingsMargin: n, childrenMargin: o }) } }).spacing((t, e) => t.parent == e.parent ? 0 : i.neightbourMargin(t, e)), this.setLayouts({ expandNodesFirst: !1 }); const n = t.patternify({ tag: "svg", selector: "svg-chart-container" }).style("background-color", i.backgroundColor).attr("width", i.svgWidth).attr("height", i.svgHeight).attr("font-family", i.defaultFont); i.firstDraw && n.call(i.zoomBehavior).on("dblclick.zoom", null).attr("cursor", "move"), i.svg = n; const o = n.patternify({ tag: "g", selector: "chart" }); return i.centerG = o.patternify({ tag: "g", selector: "center-group" }), i.linksWrapper = i.centerG.patternify({ tag: "g", selector: "links-wrapper" }), i.nodesWrapper = i.centerG.patternify({ tag: "g", selector: "nodes-wrapper" }), i.connectionsWrapper = i.centerG.patternify({ tag: "g", selector: "connections-wrapper" }), i.defsWrapper = n.patternify({ tag: "g", selector: "defs-wrapper" }), i.firstDraw && i.centerG.attr("transform", () => i.layoutBindings[i.layout].centerTransform({ centerX: a.centerX, centerY: a.centerY, scale: i.lastTransform.k, rootMargin: i.rootMargin, root: i.root, chartHeight: a.chartHeight, chartWidth: a.chartWidth })), i.chart = o, this.update(i.root), M.select(window).on(`resize.${i.id}`, () => { var t = M.select(i.container).node().getBoundingClientRect(); i.svg.attr("width", t.width) }), i.firstDraw && (i.firstDraw = !1), i.svg = n, M.i = i, this } 
      
      dragAttachHandler(){
        const attrs = this.getChartState();
        attrs.svg.selectAll('.node').call(M.drag()
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended));
      }
      dragstarted(d) {
        d.sourceEvent.stopPropagation();
        M.select(this).classed("dragging", true);
        M.sourceNode = d;
      }
      dragged(d,event) {
        const x = (d.x) - (event.width/2);

      // const _x = (event.x - d.x);
      // const _y = (event.y - d.y);
      // const moveThreshold = 30;
      // const isMoved = (_x > -(moveThreshold) && _x < (moveThreshold)) || (_y > -(moveThreshold) && _y < (moveThreshold));

      // if(!isMoved) return;

      M.select(this).raise().attr('transform', `translate(${x},${d.y})`);
      // set default style
      M.selectAll('rect').attr("fill", "#fff").attr("stroke", "null").attr("stroke-width", "1px");
      M.targetNode = null;
      // check nodes overlapping
      const cP = {x0: d.x, y0: d.y,x1: d.x+event.width,y1: d.y+event.height};

      M.selectAll('g.node:not(.dragging)').filter((d,i) => {
       const cPInner = {x0: d.x, y0: d.y,x1: d.x+d.width,y1: d.y+d.height};
        if((cP.x1 > cPInner.x0  &&  cP.x0 < cPInner.x1) && ( cP.y1 > cPInner.y0 && cP.y0 < cPInner.y1)){
          M.targetNode = d;
          return d;
        }
      }).select('rect').attr("fill", "#e4e1e1").attr("stroke", "#e4e1e1").attr("stroke-width", "2px");
    }
    dragended(d) {
      //console.log(M.i.data);
      // const d3 = this.getChartState();
      if (!M.i.data || M.i.data.length == 0) {
        console.log('ORG CHART - Data is empty');
        return this;
    }

      M.select(this).classed("dragging", false);

      // set default style
      M.selectAll('rect').attr("fill", "#fff").attr("stroke", "null").attr("stroke-width", "1px");

      const x = (d.subject.x) - (d.subject.width/2);

      M.select(this).attr('transform', `translate(${x},${(d.subject.y)})`);

      if(M.sourceNode && M.targetNode){    

        const sourceNodeData = M.sourceNode.subject.data;
        const targetNodeData = M.targetNode.data;

        //After drag&drop update tags
        var depth = chart.calculateDepth(targetNodeData.id);
        var tag = chart.positiontag(depth, targetNodeData.tags);
        sourceNodeData.tags = tag;

        const sourceNodeIndex = M.i.data.findIndex(d => d.id == sourceNodeData.id);
        const targetNodeIndex = M.i.data.findIndex(d => d.id == targetNodeData.id);


        if(targetNodeData.parentId == sourceNodeData.id){
          M.i.data[targetNodeIndex].parentId = sourceNodeData.parentId;
        } else {

          const sourceId = sourceNodeData.id;
          const sourceParentId = sourceNodeData.parentId;

          // get all children of source node
          const sourceChildren = M.i.data.filter(d => d.parentId == sourceId);

          if(sourceChildren){
          // replace parentId of all children with source ParentId
          sourceChildren.forEach(d => {
            d.parentId = sourceParentId;
          });
          }
        }

        M.i.data[sourceNodeIndex].parentId = targetNodeData.id;

        M.i.refresh.updateNodesState();

        M.i.onDrop({source: M.i.data[sourceNodeIndex],target: M.i.data[targetNodeIndex]});
      }
      // clear current state
      M.sourceNode = null;
      M.targetNode = null;
    }  
    

    enlargeNodeHeight(nodeId) {
      const attrs = this.getChartState();
      const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
      if (node.data.tags == "ManagementBoard") {
        managementBoardNodeHeight += 10;
      } else if (node.data.tags == "GeneralManager") {
        generalManagerHeight += 10;
      } else if (node.data.tags == "DeputyGeneralManager") {
        deputyGeneralManagerHeight += 10;
      } else if (node.data.tags == "AssistantGeneralManager") {
        assistantGeneralManagerHeight += 10;
      } else if (node.data.tags == "Minister") {
        ministerHeight += 10;
      } else {
        managerHeight += 10;
      }
      this.updateNodesState();
    }
    enlargeNodeWidth(nodeId) {
      const attrs = this.getChartState();
      const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
      if (node.data.tags == "ManagementBoard") {
        managementBoardNodeWidth += 10;
      } else if (node.data.tags == "GeneralManager") {
        generalManagerWidth += 10;
      } else if (node.data.tags == "DeputyGeneralManager") {
        deputyGeneralManagerWidth += 10;
      } else if (node.data.tags == "AssistantGeneralManager") {
        assistantGeneralManagerWidth += 10;
      } else if (node.data.tags == "Minister") {
        ministerWidth += 10;
      } else {
        managerWidth += 10;
      }
      this.updateNodesState();
    }
    minimizeNodeHeight(nodeId) {
      const attrs = this.getChartState();
      const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
      if (node.data.tags == "ManagementBoard") {
        managementBoardNodeHeight -= 10;
      } else if (node.data.tags == "GeneralManager") {
        generalManagerHeight -= 10;
      } else if (node.data.tags == "DeputyGeneralManager") {
        deputyGeneralManagerHeight -= 10;
      } else if (node.data.tags == "AssistantGeneralManager") {
        assistantGeneralManagerHeight -= 10;
      } else if (node.data.tags == "Minister") {
        ministerHeight -= 10;
      } else {
        managerHeight -= 10;
      }
      this.updateNodesState();
    }
    minimizeNodeWidth(nodeId) {
      const attrs = this.getChartState();
      const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
      if (node.data.tags == "ManagementBoard") {
        managementBoardNodeWidth -= 10;
      } else if (node.data.tags == "GeneralManager") {
        generalManagerWidth -= 10;
      } else if (node.data.tags == "DeputyGeneralManager") {
        deputyGeneralManagerWidth -= 10;
      } else if (node.data.tags == "AssistantGeneralManager") {
        assistantGeneralManagerWidth -= 10;
      } else if (node.data.tags == "Minister") {
        ministerWidth -= 10;
      } else {
        managerWidth -= 10;
      }
      this.updateNodesState();
    }

    enlargeChildrenMargin() {
      childrenMarginValue += 10;
      this.updateNodesState();
    }

    minimizeChildrenMargin() {
      childrenMarginValue -= 10;
      this.updateNodesState();
    }

    enlargeMarginBetween() {
      compactMarginBetweenValue += 10;
      this.updateNodesState();
    }

    minimizeMarginBetween() {
      compactMarginBetweenValue -= 10;
      this.updateNodesState();
    }

    enlargeMarginPair() {
      compactMarginPairValue += 10;
      this.updateNodesState();
    }

    minimizeMarginPair() {
      compactMarginPairValue -= 10;
      this.updateNodesState();
    }

    enlargeNeightbourMargin() {
      neightbourMarginValue += 10;
      this.updateNodesState();
    }

    minimizeNeightbourMargin() {
      neightbourMarginValue -= 10;
      this.updateNodesState();
    }

    enlargeSiblingsMargin() {
      siblingsMarginValue += 10;
      this.updateNodesState();
    }

    minimizeSiblingsMargin() {
      siblingsMarginValue -= 10;
      this.updateNodesState();
    }

    linkFrom(nodeId) {
      fromLink = nodeId;
    }
    
    linkTo(nodeId) {
      toLink = nodeId;
    }
    
    addNode(obj) {
      const attrs = this.getChartState();
      const nodeFound = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) === attrs.nodeId(obj))[0];
      const parentFound = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) === attrs.parentNodeId(obj))[0];
      if (nodeFound) {
          console.log(`ORG CHART - ADD - Node with id "${attrs.nodeId(obj)}" already exists in tree`);
          return this;
      }
      if (!parentFound) {
          console.log(`ORG CHART - ADD - Parent node with id "${attrs.parentNodeId(obj)}" not found in the tree`)
          return this;
      }
      if (obj._centered && !obj._expanded) obj._expanded = true;
 
      attrs.data.push(obj);

      // Update state of nodes and redraw graph
      this.updateNodesState();
      
      return this;
  }
    //Save and download all data csv format
    saveAllData() {
      // convert data to CSV format
      var csv = d3.csvFormat(M.i.data);

      // create a Blob object with the CSV data
      var blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

      // create a download link
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "orgchart.csv");
      document.body.appendChild(link);
      link.click();
  }
    removeNode(nodeId) {
      const attrs = this.getChartState();
      const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
      if (!node) {
          console.log(`ORG CHART - REMOVE - Node with id "${nodeId}" not found in the tree`);
          return this;
      }

      // Remove all node childs
      // Retrieve all children nodes ids (including current node itself)
      node.descendants()
          .forEach(d => d.data._filteredOut = true)

      const descendants = this.getNodeChildren(node, [], attrs.nodeId);
      descendants.forEach(d => d._filtered = true)

      // Filter out retrieved nodes and reassign data
      attrs.data = attrs.data.filter(d => !d._filtered);

      const updateNodesState = this.updateNodesState.bind(this);
      // Update state of nodes and redraw graph
      updateNodesState();

      return this;
  } 
  //Determine position according to depth
    positiontag(depth, tags) {
      var tag = "Manager";
      if (depth == 0) {
        tag = "GeneralManager";
      }
      else if (depth == 1) {
        tag = "AssistantGeneralManager";
      }
      else if (depth == 2 && tags == "AssistantGeneralManager") {
        tag = "DeputyGeneralManager";
      }
      else if (depth == 2 && tags == "Minister") {
        tag = "Manager";
      }
      else {
        tag = "Manager";
      }
      return tag;
  }
  //Update as a minister
  setMinister(nodeId) {
    const attrs = this.getChartState();
    const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
    if (node) {
      node.data.tags = "Minister";
      this.updateNodesState();
    }
  }
  //Update as an assistant manager
  setAssistantGeneralManager(nodeId) {
    const attrs = this.getChartState();
    const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
    if (node) {
      node.data.tags = "AssistantGeneralManager";
      this.updateNodesState();
    }
  }
  //Update Name operation
  updateNodeName(nodeId, name) {
    const attrs = this.getChartState();
    const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
    if (node) {
      node.data.name = name;
      this.updateNodesState();
    }
  }
  //Update Section Id operation
  updateNodeSectionId(nodeId, name) {
    const attrs = this.getChartState();
    const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
    if (node) {
      node.data.sectionId = name;
      this.updateNodesState();
    }
  }
  //Update position name operation
  updateNodePositionName(nodeId, name) {
    const attrs = this.getChartState();
    const node = attrs.allNodes.filter(({ data }) => attrs.nodeId(data) == nodeId)[0];
    if (node) {
      node.data.positionName = name;
      this.updateNodesState();
    }
  }

  //Update position name operation
  updateTextBoxName(textBox, name) {
    textBox = name;
    console.log(textBox);
    this.updateNodesState();
  }
  
  calculateDepth(nodeId) {
      // Find the node with the given ID
      const node = M.i.data.find(n => n.id === nodeId);

      // If node is not found, return -1 to indicate that the node doesn't exist
      if (!node) {
        return -1;
      }
      let depth = 0;
      let parentId = node.parentId;

      // Traverse up the tree to calculate depth
      while (parentId !== "") {
        const parent = M.i.data.find(n => n.id === parentId);
        parentId = parent.parentId;
        depth++;
      }
      return depth;
  }

  groupBy(t, a, e) { const n = {}; return t.forEach(t => { var e = a(t); n[e] || (n[e] = []), n[e].push(t) }), Object.keys(n).forEach(t => { n[t] = e(n[t]) }), Object.entries(n) } 
  
  calculateCompactFlexDimensions(root) {
    const attrs = this.getChartState();
    root.eachBefore(node => {
        node.firstCompact = null;
        node.compactEven = null;
        node.flexCompactDim = null;
        node.firstCompactNode = null;
    })
    root.eachBefore(node => {
        if (node.children && node.children.length > 2) {
            const compactChildren = node.children.filter(d => !d.children);
            if (compactChildren.length < 3) return;
            compactChildren.forEach((child, i) => {
                if (!i) child.firstCompact = true;
                if (i % 2) child.compactEven = false;
                else child.compactEven = true;
                child.row = Math.floor(i / 1);
            })
            const evenMaxColumnDimension = d3.max(compactChildren.filter(d => d.compactEven), attrs.layoutBindings[attrs.layout].compactDimension.sizeColumn);
            const oddMaxColumnDimension = d3.max(compactChildren.filter(d => !d.compactEven), attrs.layoutBindings[attrs.layout].compactDimension.sizeColumn);
            const columnSize = Math.max(evenMaxColumnDimension, oddMaxColumnDimension) * 2;
            const rowsMapNew = this.groupBy(compactChildren, d => d.row, reducedGroup => d3.max(reducedGroup, d => attrs.layoutBindings[attrs.layout].compactDimension.sizeRow(d) + attrs.compactMarginBetween(d)));
            const rowSize = d3.sum(rowsMapNew.map(v => v[1]))
            compactChildren.forEach(node => {
                node.firstCompactNode = compactChildren[0];//1 yapinca desenli ciziyor.
                if (node.firstCompact) {
                  node.flexCompactDim = [
                    columnSize + attrs.compactMarginPair(node),
                    rowSize - attrs.compactMarginBetween(node)
                ];} 
                else {
                    node.flexCompactDim = [0, 0];
                }
            })
            node.flexCompactDim = null;
        }
    })
}

calculateCompactFlexPositions(root) {
    const attrs = this.getChartState();
    root.eachBefore(node => {
        if (node.children) {
            const compactChildren = node.children.filter(d => d.flexCompactDim);
            const fch = compactChildren[0];
            if (!fch) return;
            compactChildren.forEach((child, i, arr) => {
              if (child.data.office === "right") {
                child.x = child.parent.x - child.width * 1.5;
                child.y = child.parent.y;
              } else if (child.data.office === "left") {
                child.x = child.parent.x - child.width * 1.5;
                child.y = child.parent.y;
              } else {
                if (i == 0) {
                  fch.x -= fch.flexCompactDim[0] / 2;
                } if (i & i % 2 - 2) {
                  child.x = fch.x + fch.flexCompactDim[0] * 0.25 - attrs.compactMarginPair(child) / 4;
                } else if (i) child.x = fch.x + fch.flexCompactDim[0] * 0.75 + attrs.compactMarginPair(child) / 4;
              }
              //console.log(child.data.office);
                        
            })
            const centerX = fch.x + fch.flexCompactDim[0] * 0.5;
            fch.x = fch.x + fch.flexCompactDim[0] * 0.25 - attrs.compactMarginPair(fch) / 4;
            const offsetX = node.x - centerX;
            if (Math.abs(offsetX) < 10) {
                compactChildren.forEach(d => d.x -= offsetX);
            }

            const rowsMapNew = this.groupBy(compactChildren, d => d.row, reducedGroup => d3.max(reducedGroup, d => attrs.layoutBindings[attrs.layout].compactDimension.sizeRow(d)));
            const cumSum = d3.cumsum(rowsMapNew.map(d => d[1] + attrs.compactMarginBetween(d)));
            compactChildren
                .forEach((node, i) => {
                  if (node.data.office === "right") {
                    node.x = node.parent.x - node.width * 1.5;
                    node.y = node.parent.y;
                  } else if (node.data.office === "left") {
                    node.x = node.parent.x - node.width * 1.5;
                    node.y = node.parent.y - node.height * 1.5;
                  } else {
                    if (node.row) {
                      node.y = fch.y + cumSum[node.row - 1];
                  } else {
                      node.y = fch.y;
                    }
                  }      
                })
        }
    })
}

update({ x0: a, y0: n, x: o = 0, y: i = 0, width: r, height: d }) {
  
  const s = this.getChartState();
  s.calc;
  s.compact && this.calculateCompactFlexDimensions(s.root);
  const t = s.flexTreeLayout(s.root);
  s.compact && this.calculateCompactFlexPositions(s.root);
  const e = t.descendants();
  var l = t.descendants().slice(1);
  e.forEach(s.layoutBindings[s.layout].swap);
  const h = s.connections,
    c = {};
  s.allNodes.forEach((t) => (c[s.nodeId(t.data)] = t));
  const g = {};
  e.forEach((t) => (g[s.nodeId(t.data)] = t)),
    h.forEach((t) => {
      var e = c[t.from],
        a = c[t.to];
      (t._source = e), (t._target = a);
    });

  var u = h.filter((t) => g[t.from] && g[t.to]),
    p = s.defs.bind(this)(s, u);
  p !== s.defsWrapper.html() && s.defsWrapper.html(p);
  const m = s.linksWrapper
      .selectAll('path.link')
      .data(l, (t) => s.nodeId(t.data)),
    f = m
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (t) => {
        var e = {
          x: s.layoutBindings[s.layout].linkJoinX(t),
          y: s.layoutBindings[s.layout].linkJoinY(t),
        };
        return s.layoutBindings[s.layout].diagonal(e, e, e);
      }),
    y = f.merge(m);
  y.attr('fill', 'none'),
    y.each(s.linkUpdate),
    y
      .transition()
      .duration(s.duration)
      .attr('d', (t) => {
        var e =
            s.compact && t.flexCompactDim
              ? {
                  x: s.layoutBindings[s.layout].compactLinkMidX(t, s),
                  y: s.layoutBindings[s.layout].compactLinkMidY(t, s),
                }
              : {
                  x: s.layoutBindings[s.layout].linkX(t),
                  y: s.layoutBindings[s.layout].linkY(t),
                },
          a = {
            x: s.layoutBindings[s.layout].linkParentX(t),
            y: s.layoutBindings[s.layout].linkParentY(t),
          },
          t =
            s.compact && t.flexCompactDim
              ? {
                  x: s.layoutBindings[s.layout].linkCompactXStart(t),
                  y: s.layoutBindings[s.layout].linkCompactYStart(t),
                }
              : e;
        return s.layoutBindings[s.layout].diagonal(e, a, t);
      });
  m.exit()
    .transition()
    .duration(s.duration)
    .attr('d', (t) => {
      var e = {
        x: s.layoutBindings[s.layout].linkJoinX(t),
        y: s.layoutBindings[s.layout].linkJoinY(t),
      };
      return s.layoutBindings[s.layout].diagonal(e, e);
    })
    .remove();
  const x = s.connectionsWrapper.selectAll('path.connection').data(u),
    w = x
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', (t) => {
        var e = {
          x: s.layoutBindings[s.layout].linkJoinX(t._source != undefined ? t._source : t),
          y: s.layoutBindings[s.layout].linkJoinY(t._source != undefined ? t._source : t),
        };
        return s.layoutBindings[s.layout].diagonal(e, e, e);
      }),
    v = w.merge(x);
  v.attr('fill', 'none'),
    v
      .transition()
      .duration(s.duration)
      .attr('d', (t) => {
        var e = s.layoutBindings[s.layout].linkX(t._source != undefined ? t._source : t),
          a = s.layoutBindings[s.layout].linkY(t._source != undefined ? t._source : t),
          n = s.layoutBindings[s.layout].linkJoinX(t._source != undefined ? t._target : t),
          y = s.layoutBindings[s.layout].linkJoinY(t._source != undefined ? t._target : t);
        return s.linkGroupArc({
          source: { x: e , y: a  - t._source.height / 4.4},
          target: { x: n - t._source.width / 2, y: y - t._source.height / 1.44},
        });
      }),
    v.each(s.connectionsUpdate);
  x.exit().transition().duration(s.duration).attr('opacity', 0).remove();
  const C = s.nodesWrapper
      .selectAll('g.node')
      .data(e, ({ data: t }) => s.nodeId(t)),
    b = C.enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (t) => {
        return t == s.root
          ? `translate(${a},${n})`
          : `translate(${s.layoutBindings[s.layout].nodeJoinX(t)},
          ${s.layoutBindings[s.layout].nodeJoinY(t)})`;
      })
      .attr('cursor', 'pointer')
      .on('click', (t, { data: e }) => {
        [...t.srcElement.classList].includes(
          'node-button-foreign-object'
        ) || s.onNodeClick(s.nodeId(e));
      });
  b.patternify({ tag: 'rect', selector: 'node-rect', data: (t) => [t] });
  const k = b.merge(C).style('font', '13px sans-serif'),
    $ = k
      .patternify({
        tag: 'foreignObject',
        selector: 'node-foreign-object',
        data: (t) => [t],
      })
      .style('overflow', 'visible');
  $.patternify({
    tag: 'xhtml:div',
    selector: 'node-foreign-object-div',
    data: (t) => [t],
  }),
    this.restyleForeignObjectElements();
  const _ = b
    .patternify({ tag: 'g', selector: 'node-button-g', data: (t) => [t] })
    .on('click', (t, e) => this.onButtonClick(t, e));
  _.patternify({
    tag: 'rect',
    selector: 'node-button-rect',
    data: (t) => [t],
  })
    .attr('opacity', 0)
    .attr('pointer-events', 'all')
    .attr('width', 40)
    .attr('height', 40)
    .attr('x', -20)
    .attr('y', -20);
  _.patternify({
    tag: 'foreignObject',
    selector: 'node-button-foreign-object',
    data: (t) => [t],
  })
    .attr('width', 40)
    .attr('height', 40)
    .attr('x', -20)
    .attr('y', -20)
    .style('overflow', 'visible')
    .patternify({
      tag: 'xhtml:div',
      selector: 'node-button-div',
      data: (t) => [t],
    })
    .style('pointer-events', 'none')
    .style('display', 'flex')
    .style('width', '100%')
    .style('height', '100%');
  k
    .transition()
    .attr('opacity', 0)
    .duration(s.duration)
    .attr('transform', (t) =>
      s.layoutBindings[s.layout].nodeUpdateTransform(t)
    )
    .attr('opacity', 1),
    k
      .select('.node-rect')
      .attr('width', ({ width: t }) => t)
      .attr('height', ({ height: t }) => t)
      .attr('x', ({}) => 0)
      .attr('y', ({}) => 0)
      .attr('cursor', 'pointer')
      .attr('rx', 3)
      .attr('fill', s.nodeDefaultBackground),
    k
      .select('.node-button-g')
      .attr('transform', (t) => {
        return `translate(${s.layoutBindings[s.layout].buttonX(t)},${s.layoutBindings[s.layout].buttonY(t)})`;
      })
      .attr('display', ({ data: t }) =>
        0 < t._directSubordinates ? null : 'none'
      )
      .attr('opacity', ({ children: t, _children: e }) => (t || e ? 1 : 0)),
    k
      .select('.node-button-foreign-object .node-button-div')
      .html((t) => s.buttonContent({ node: t, state: s })),
    k
      .select('.node-button-text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('fill', s.defaultTextFill)
      .attr('font-size', ({ children: t }) => (t ? 40 : 26))
      .text(({ children: t }) => (t ? '-' : '+'))
      .attr('y', this.isEdge() ? 10 : 0),
    k.each(s.nodeUpdate);
  C.exit()
    .attr('opacity', 1)
    .transition()
    .duration(s.duration)
    .attr('transform', (t) => {
      return `translate(${s.layoutBindings[s.layout].nodeJoinX(t)},
      ${s.layoutBindings[s.layout].nodeJoinY(t)})`;
    })
    .on('end', function () {
      M.select(this).remove();
    })
    .attr('opacity', 0);
  e.forEach((t) => {
    (t.x0 = t.x), (t.y0 = t.y);
  });
  const E = s.allNodes.filter((t) => t.data._centered)[0];
  E &&
    ((u = E.data._centeredWithDescendants
      ? E.descendants().filter((t, e) => e < 7)
      : [E]),
    (E.data._centeredWithDescendants = null),
    (E.data._centered = null),
    this.fit({ animate: !0, scale: !1, nodes: u }));
  this.dragAttachHandler();
  const _attrs = this.getChartState();
  const { root } = _attrs;
  if (root && root.descendants()) {
    this.descendants = root.descendants();
  }
} isEdge() { return window.navigator.userAgent.includes("Edge") } hdiagonal(s, t, m) {
        // Define source and target x,y coordinates
        const x = s.x;
        const y = s.y;
        const ex = t.x;
        const ey = t.y;

        let mx = m && m.x || x;
        let my = m && m.y || y;
        
        // Values in case of top reversed and left reversed diagonals
        let xrvs = ex - x < 0 ? -1 : 1;
        let yrvs = ey - y < 0 ? -1 : 1;

        // Define preferred curve radius
        let rdef = 35;

        // Reduce curve radius, if source-target x space is smaller
        let r = Math.abs(ex - x) / 2 < rdef ? Math.abs(ex - x) / 2 : rdef;

        // Further reduce curve radius, is y space is more small
        r = Math.abs(ey - y) / 2 < r ? Math.abs(ey - y) / 2 : r;

        // Defin width and height of link, excluding radius
        let h = Math.abs(ey - y) / 2 - r;
        let w = Math.abs(ex - x) / 2 - r;

        // Build and return custom arc command
        return `
                  M ${mx} ${my}
                  L ${mx} ${y}
                  L ${x} ${y}
                  L ${x + w * xrvs} ${y}
                  C ${x + w * xrvs + r * xrvs} ${y}
                    ${x + w * xrvs + r * xrvs} ${y}
                    ${x + w * xrvs + r * xrvs} ${y + r * yrvs}
                  L ${x + w * xrvs + r * xrvs} ${ey - r * yrvs}
                  C ${x + w * xrvs + r * xrvs}  ${ey}
                    ${x + w * xrvs + r * xrvs}  ${ey}
                    ${ex - w * xrvs}  ${ey}
                  L ${ex} ${ey}
       `;
    } diagonal(t, e, a) {
            var n = t.x + 30, o = t.y, i = e.x, r = e.y, d = a && a.x || n, s = a && a.y || o, l = i - n < 0 ? -1 : 1, t = r - o < 0 ? -1 : 1; let h = Math.abs(i - n) / 2 < 35 ? Math.abs(i - n) / 4 : 35; h = Math.abs(r - o) / 2 < h ? Math.abs(r - o) / 2 : h; e = Math.abs(r - o) / 2 - h, a = Math.abs(i - n) - 1 * h;//I changed a = Math.abs(i - n) - 1 * h; before 2 * h 
            return `
                  M ${d} ${s}
                  L ${n} ${s}
                  L ${n} ${o}
                  L ${n} ${o + e * t}
                  C  ${n} ${o + e * t + h * t} ${n} ${o + e * t + h * t} ${n + h * l} ${o + e * t + h * t}
                  L ${n + a * l + h * l} ${o + e * t + h * t}
                  C  ${i}  ${o + e * t + h * t} ${i}  ${o + e * t + h * t} ${i} ${r - e * t}
                  L ${i} ${r}
       `} restyleForeignObjectElements() { const n = this.getChartState(); n.svg.selectAll(".node-foreign-object").attr("width", ({ width: t }) => t).attr("height", ({ height: t }) => t).attr("x", ({ }) => 0).attr("y", ({ }) => 0), n.svg.selectAll(".node-foreign-object-div").style("width", ({ width: t }) => `${t}px`).style("height", ({ height: t }) => `${t}px`).html(function (t, e, a) { return n.nodeContent.bind(this)(t, e, a, n) }) } onButtonClick(t, e) { this.getChartState().setActiveNodeCentered && (e.data._centered = !0, e.data._centeredWithDescendants = !0), e.children ? (e._children = e.children, e.children = null, this.setExpansionFlagToChildren(e, !1)) : (e.children = e._children, e._children = null, e.children && e.children.forEach(({ data: t }) => t._expanded = !0)), this.update(e) } setExpansionFlagToChildren({ data: t, children: e, _children: a }, n) { t._expanded = n, e && e.forEach(t => { this.setExpansionFlagToChildren(t, n) }), a && a.forEach(t => { this.setExpansionFlagToChildren(t, n) }) } expandSomeNodes(e) { if (e.data._expanded) { let t = e.parent; for (; t;)t._children && (t.children = t._children), t = t.parent } e._children && e._children.forEach(t => this.expandSomeNodes(t)), e.children && e.children.forEach(t => this.expandSomeNodes(t)) } updateNodesState() { var t = this.getChartState(); this.setLayouts({ expandNodesFirst: !0 }), this.update(t.root) } setLayouts({ expandNodesFirst: t = !0 }) { const i = this.getChartState(); i.root = M.stratify().id((t) => i.nodeId(t)).parentId(t => i.parentNodeId(t))(i.data), i.root.each((t, e, a) => { var n = i.nodeWidth(t), o = i.nodeHeight(t); Object.assign(t, { width: n, height: o }) }), i.root.x0 = 0, i.root.y0 = 0, i.allNodes = i.root.descendants(), i.allNodes.forEach(t => { Object.assign(t.data, { _directSubordinates: t.children ? t.children.length : 0, _totalSubordinates: t.descendants().length - 1 }) }), i.root.children && t && i.root.children.forEach(this.expand), i.root.children.forEach((t) => this.collapse(t)), 0 == i.expandLevel && (i.root._children = i.root.children, i.root.children = null), [i.root].forEach((t) => this.expandSomeNodes(t)) } collapse(t) { t.children && (t._children = t.children, t._children.forEach(t => this.collapse(t)), t.children = null) } expand(t) { t._children && (t.children = t._children, t.children.forEach(t => this.expand(t)), t._children = null) } zoomed(t, e) { const a = this.getChartState(), n = a.chart; t = t.transform; a.lastTransform = t, n.attr("transform", t), this.isEdge() && this.restyleForeignObjectElements() } zoomTreeBounds({ x0: t, x1: e, y0: a, y1: n, params: o = { animate: !0, scale: !0 } }) { const { centerG: i, svgWidth: r, svgHeight: d, svg: s, zoomBehavior: l, duration: h, lastTransform: c } = this.getChartState(); var g = Math.min(8, .9 / Math.max((e - t) / r, (n - a) / d)); let u = M.zoomIdentity.translate(r / 2, d / 2); u = u.scale(o.scale ? g : c.k), u = u.translate(-(t + e) / 2, -(a + n) / 2), s.transition().duration(o.animate ? h : 0).call(l.transform, u), i.transition().duration(o.animate ? h : 0).attr("transform", "translate(0,0)") } fit({ animate: t = !0, nodes: e, scale: a = !0 } = {}) { const n = this.getChartState(), { root: o } = n; var i = e || o.descendants(), r = M.min(i, t => t.x + n.layoutBindings[n.layout].nodeLeftX(t)), d = M.max(i, t => t.x + n.layoutBindings[n.layout].nodeRightX(t)), e = M.min(i, t => t.y + n.layoutBindings[n.layout].nodeTopY(t)), i = M.max(i, t => t.y + n.layoutBindings[n.layout].nodeBottomY(t)); return this.zoomTreeBounds({ params: { animate: t, scale: a }, x0: r - 50, x1: d + 50, y0: e - 50, y1: i + 50 }), this } setExpanded(e, t = !0) { const a = this.getChartState(), n = a.allNodes.filter(({ data: t }) => a.nodeId(t) == e)[0]; return n ? n.data._expanded = t : console.log(`ORG CHART - ${t ? "EXPAND" : "COLLAPSE"} - Node with id (${e})  not found in the tree`), this } setCentered(e) { const a = this.getChartState(), t = a.allNodes.filter(t => a.nodeId(t.data) === e)[0]; return t ? (t.data._centered = !0, t.data._expanded = !0) : console.log(`ORG CHART - CENTER - Node with id (${e}) not found in the tree`), this } setHighlighted(e) { const a = this.getChartState(), t = a.allNodes.filter(t => a.nodeId(t.data) === e)[0]; return t ? (t.data._highlighted = !0, t.data._expanded = !0, t.data._centered = !0) : console.log(`ORG CHART - HIGHLIGHT - Node with id (${e})  not found in the tree`), this } setUpToTheRootHighlighted(e) { const a = this.getChartState(), t = a.allNodes.filter(t => a.nodeId(t.data) === e)[0]; return t ? (t.data._upToTheRootHighlighted = !0, t.data._expanded = !0, t.ancestors().forEach(t => t.data._upToTheRootHighlighted = !0)) : console.log(`ORG CHART - HIGHLIGHTROOT - Node with id (${e}) not found in the tree`), this } clearHighlighting() { const t = this.getChartState(); t.allNodes.forEach(t => { t.data._highlighted = !1, t.data._upToTheRootHighlighted = !1 }), this.update(t.root) } fullscreen(t) { const e = this.getChartState(), a = M.select(t || e.container).node(); M.select(document).on("fullscreenchange." + e.id, function (t) { (document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement) == a ? setTimeout(t => { e.svg.attr("height", window.innerHeight - 40) }, 500) : e.svg.attr("height", e.svgHeight) }), a.requestFullscreen ? a.requestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.msRequestFullscreen && a.msRequestFullscreen() } zoomIn() { const { svg: t, zoomBehavior: e } = this.getChartState(); t.transition().call(e.scaleBy, 1.3) } zoomOut() { const { svg: t, zoomBehavior: e } = this.getChartState(); t.transition().call(e.scaleBy, .78) } toDataURL(t, e) { var a = new XMLHttpRequest; a.onload = function () { var t = new FileReader; t.onloadend = function () { e(t.result) }, t.readAsDataURL(a.response) }, a.open("GET", t), a.responseType = "blob", a.send() } exportImg({ full: a = !1, scale: n = 3, onLoad: o = t => t, save: i = !0 } = {}) { const r = this; const { svg: t, root: d } = this.getChartState(); let e = 0; const s = t.selectAll("img"); let l = s.size(); const h = () => { JSON.parse(JSON.stringify(r.lastTransform())); var t = r.duration(); a && r.fit(); const { svg: e } = r.getChartState(); setTimeout(t => { r.downloadImage({ node: e.node(), scale: n, isSvg: !1, onAlreadySerialized: t => { r.update(d) }, onLoad: o, save: i }) }, a ? t + 10 : 0) }; 0 < l ? s.each(function () { r.toDataURL(this.src, t => { this.src = t, ++e == l && h() }) }) : h() } exportSvg() { const { svg: t } = this.getChartState(); return this.downloadImage({ node: t.node(), scale: 3, isSvg: !0 }), this } expandAll() { const { allNodes: t } = this.getChartState(); return t.forEach(t => t.data._expanded = !0), this.render(), this } collapseAll() { const { allNodes: t } = this.getChartState(); return t.forEach(t => t.data._expanded = !1), this.expandLevel(0), this.render(), this } downloadImage({ node: t, scale: e = 2, isSvg: a = !1, save: n = !0, onAlreadySerialized: o = t => { }, onLoad: i = t => { } }) { const r = t; if (a) { var d = '<?xml version="1.0" standalone="no"?>\r\n' + (d = c(r)); return h(d = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(d), "graph.svg"), void o() } const s = e, l = document.createElement("img"); l.onload = function () { const t = document.createElement("canvas"); var e = r.getBoundingClientRect(); t.width = e.width * s, t.height = e.height * s; const a = t.getContext("2d"); a.fillStyle = "#FAFAFA", a.fillRect(0, 0, e.width * s, e.height * s), a.drawImage(l, 0, 0, e.width * s, e.height * s); e = t.toDataURL("image/png"); i && i(e), n && h(e, "graph.png") }; d = "data:image/svg+xml; charset=utf8, " + encodeURIComponent(c(r)); function h(t, e) { var a = document.createElement("a"); "string" == typeof a.download ? (document.body.appendChild(a), a.download = e, a.href = t, a.click(), document.body.removeChild(a)) : location.replace(t) } function c(t) { var e = "http://www.w3.org/2000/xmlns/"; t = t.cloneNode(!0); var a = window.location.href + "#"; const n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, null, !1); for (; n.nextNode();)for (const i of n.currentNode.attributes) i.value.includes(a) && (i.value = i.value.replace(a, "#")); t.setAttributeNS(e, "xmlns", "http://www.w3.org/2000/svg"), t.setAttributeNS(e, "xmlns:xlink", "http://www.w3.org/1999/xlink"); const o = new XMLSerializer; return o.serializeToString(t) } o(), l.src = d } getTextWidth(t, { fontSize: e = 14, fontWeight: a = 400, defaultFont: n = "Helvetice", ctx: o } = {}) { return o.font = `${a || ""} ${e}px ${n} `, o.measureText(t).width }
    }, Object.defineProperty(t, "__esModule", { value: !0 })
});
