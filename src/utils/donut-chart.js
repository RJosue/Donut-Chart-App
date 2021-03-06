const { createCanvas } = require('canvas');

function DonutChart() {
    this.create = (obj) => {
        try {
            var { width = 500, heigth = 500, cx = 250, cy = 250, radius = 200, arcwidth = 100, colors = ['#663399', '#333333'], colorFont = "#333333", font = "arial", porcen = 65 } = obj
            const canvas = createCanvas(width, heigth)
            const ctx = canvas.getContext('2d')
            const values = []
            if (porcen >= 100) {
                porcen = 100
            } else {
                if (porcen < 0) {
                    porcen = 0
                }
            }
            var por = 100 - porcen
            values.push(porcen)
            values.push(por)
            var tot = 0;
            var accum = 0;
            var PI = Math.PI;
            var PI2 = PI * 2;
            var offset = -PI / 2;
            ctx.lineWidth = arcwidth;
            for (var i = 0; i < values.length; i++) { tot += values[i]; }
            for (var i = 0; i < values.length; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, radius,
                    offset + PI2 * (accum / tot),
                    offset + PI2 * ((accum + values[i]) / tot)
                );
                ctx.strokeStyle = colors[i];
                ctx.stroke();
                accum += values[i];
            }
            var innerRadius = radius - arcwidth - 3;
            ctx.beginPath();
            ctx.arc(cx, cy, innerRadius, 100.5, PI2); //100.5 es para borrar el circulo de adentro poner 0 para ver la de nuevo
            ctx.fillStyle = colors[0];
            ctx.fill();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = colorFont;
            ctx.font = (innerRadius) + 'px' + font;
            ctx.fillText(values[0] + '%', cx, cy + innerRadius * .5);

            let model = {
                success: true,
                data: canvas.toDataURL()
            }
            return model
        } catch (e) {
            let model = {
                success: false,
                error: e
            }
            return model
        }
    }
}

module.exports = DonutChart