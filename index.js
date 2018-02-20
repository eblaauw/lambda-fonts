console.log('Loading Lambda HTML');

exports.handler = function (event, context) {
  var config = {
    family: 'BNNVARA Exo',
    endpoint: 'https://cdn.domain.nl/fonts/original'
  }
  
  var weights = {
    100: [
      {
        style: "normal",
        file: "font.otf"
      },
      {
        style: "italic",
        file: "fontItalic.otf"
      }
    ]
  };

  const css = Object.keys(weights).reduce((css, weight) => {
    return weights[weight].reduce((css, variant) => {
      return (
        css +
        `
      @font-face: {
          font-family: ${config.family};
          font-weight: ${weight};
          font-style: ${variant.style};
          src: url(${config.endpoint + variant.file});
      }
        `
      );
    }, css);
  }, "");

  context.succeed(css)

};
