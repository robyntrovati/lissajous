var curveTypes = {
  perlume: {
    wSine1: 4.01,
    wSine2: 3,
    hSine1: 2.005,
    hSine2: 1.01,
  },
  perming: {
    wSine1: 3.02,
    wSine2: 2.02,
    hSine1: 4.02,
    hSine2: 6.02,
  },
  pernen: {
    wSine1: 5.02,
    wSine2: 6.02,
    hSine1: 5.02,
    hSine2: 4.02,
  },
  perpep: {
    wSine1: 2.02,
    wSine2: 4.02,
    hSine1: 3.02,
    hSine2: 6.02,
  },
  persort: {
    wSine1: 4.02,
    wSine2: 3.02,
    wSine3: 1,
    hSine1: 1,
    hSine2: 5.02,
  },
  pertred: {
    wSine1: 3.02,
    wSine2: 2.02,
    hSine1: 4.02,
    hSine2: 6.02,
  },
  perquex: {
    wSine1: 2.02,
    wSine2: 4.02,
    hSine1: 3.02,
    hSine2: 6.02,
  },
  perrint: {
    wSine1: 4.01,
    wSine2: 3.01,
    hSine1: 2.01,
    hSine2: 1.01,
  }
};

var vis1 = {
  container: '#lissajous1',
  width: 300,
  height: 300,
  strokeColor: '#efddc8',
  fillColor: '#e9f5dc',
  strokeWidth: 0.5,
  maxCurves: 9,
  curveType: curveTypes.perquex,
  curved: true,
  incrementCurves: false,
}

var vis2 = {
  container: '#lissajous2',
  width: 300,
  height: 300,
  strokeColor: '#dcdcf5',
  fillColor: '#dcf5f5',
  strokeWidth: 0.5,
  maxCurves: 8,
  curveType: curveTypes.perlume,
  curved: false,
  incrementCurves: false,
}

var vis3 = {
  container: '#lissajous3',
  width: 300,
  height: 300,
  strokeColor: '#dcdcf5',
  fillColor: '#f5f5dc',
  strokeWidth: 0.5,
  maxCurves: 9,
  curveType: curveTypes.perming,
  curved: true,
  incrementCurves: false,
}

var vis4 = {
  container: '#lissajous1',
  width: 200,
  height: 200,
  strokeColor: '#efddc8',
  fillColor: '#e9f5dc',
  strokeWidth: 0.5,
  maxCurves: 9,
  curveType: curveTypes.perquex,
  curved: true,
  incrementCurves: false,
}

var vis5 = {
  container: '#lissajous3',
  width: 200,
  height: 200,
  strokeColor: '#dcdcf5',
  fillColor: '#dcf5f5',
  strokeWidth: 0.5,
  maxCurves: 8,
  curveType: curveTypes.persort,
  curved: true,
  incrementCurves: false,
}

var vis6 = {
  container: '#lissajous2',
  width: 200,
  height: 200,
  strokeColor: '#dcdcf5',
  fillColor: '#f5efdc',
  strokeWidth: 0.5,
  maxCurves: 9,
  curveType: curveTypes.perming,
  curved: true,
  incrementCurves: false,
}

var vis7 = {
  container: '#lissajous4',
  width: 200,
  height: 200,
  strokeColor: '#dcf5dc',
  fillColor: '#f5dcdc',
  strokeWidth: 0.5,
  maxCurves: 9,
  curveType: curveTypes.perlume,
  curved: true,
  incrementCurves: false,
}

var Lissajous = function(config) {
  var svg = d3.select(config.container).append('svg')
    .attr('width', config.width)
    .attr('height', config.height)
    .attr('viewBox', '0 0 ' + config.width + ' ' + config.height)
    .append('g');

  var curveSet = svg.append('path')
    .attr('fill', config.fillColor)
    .attr('stroke', config.strokeColor)
    .attr('stroke-width', config.strokeWidth);

  var curves = config.minCurves || 0.001;
  var curveIncrement = 0.001;
  var segment = config.curved ? 0.02 : 1;
  var range;

  if (config.incrementCurves) {
    setInterval(function() {
      if (curves <= 0) curveIncrement = 0.001;
      if (curves >= config.maxCurves) curveIncrement = -0.001;

      curves += curveIncrement;
      range = d3.range(-curves * Math.PI, curves * Math.PI, segment);
    }, 5);
  } else {
    range = d3.range(-config.maxCurves * Math.PI, config.maxCurves * Math.PI, segment);
  }

  d3.timer(function(t) {
    if (!range) return;

    var d = 'M';

    // Equations from http://goatlink.deviantart.com/art/lissajous-curves-338721857
    range.forEach(function(r, i) {
      d += 0.18 * config.width * (Math.sin(config.curveType.wSine1 * r + t / 2000) + Math.sin(config.curveType.wSine2 * r + t / 2000));
      d += ',';
      d += 0.18 * config.height * (Math.sin(config.curveType.hSine1 * r + t / 4000) + Math.sin(config.curveType.hSine2 * r + t / 2000));
      if (i != range.length - 1) d += 'L';
    });

    curveSet.attr('d', d);
    svg.attr('transform', 'translate(' + config.width / 2 + ',' + config.height / 2 + ')rotate(' + 360 * (t % 100000 / 100000) + ')');
  });
}

var configs = [vis1, vis2, vis3]

configs.map(function(config) {
  new Lissajous(config);
})
