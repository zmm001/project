function ol(obj) {
    var o = obj;
    window.setInterval(function() { scrollup(o, 21, 0); }, 4000);
}
function scrollup(o, d, c) {
    if (d == c) {
        var t = getFirstChild(o.firstChild).cloneNode(true);
        o.removeChild(getFirstChild(o.firstChild));
        o.appendChild(t);
        t.style.marginTop = "0px";
    } else {
        c += 1;
        getFirstChild(o.firstChild).style.marginTop = -c + "px";
        window.setTimeout(function() { scrollup(o, d, c) }, 10);
    }
}
function getFirstChild(node) {
    while (node.nodeType != 1) {
        node = node.nextSibling;
    }
    return node;
}