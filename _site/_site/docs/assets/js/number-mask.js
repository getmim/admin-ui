/**
 * Source from https://www.cssscript.com/easy-number-separator/#google_vignette
 */
function easyNumberSeparator(config) {
    // Currency Separator
    let commaCounter = 10;

    const obj = {
        separator: '.',
        decimalSeparator: ','
    }

    function numberSeparator(num) {
        for (let i = 0; i < commaCounter; i++) {
            num = num.replace(obj.separator, "");
        }

        x = num.split(obj.decimalSeparator);
        y = x[0];
        z = x.length > 1 ? obj.decimalSeparator + x[1] : "";
        let rgx = /(\d+)(\d{3})/;

        while (rgx.test(y)) {
            y = y.replace(rgx, "$1" + obj.separator + "$2");
        }
        commaCounter++;

        if (config.resultInput) {
            config.resultInput.value = num
                .replace(obj.separator, "")
                .replace(obj.decimalSeparator, ".")
        }

        return y + z;
    }

    config.element.addEventListener("input", function (e) {
        const reg = new RegExp(
        `^-?\\d*[${obj.separator}${obj.decimalSeparator}]?(\\d{0,3}${obj.separator})*(\\d{3}${obj.separator})?\\d{0,3}$`
        );

        const key = e.data || this.value.substr(-1)

        if (reg.test(key)) {
            e.target.value = numberSeparator(e.target.value);
        } else {
            e.target.value = e.target.value.substring(0, e.target.value.length - 1);
            e.preventDefault();
            return false;
        }
    });

    config.element.value = numberSeparator(config.element.value);
}

$(function(){
    $('.number-separator').each((i,element) => {
        let resultInput = $(element.dataset.input).get(0)
        easyNumberSeparator({element,resultInput})
    })
})
