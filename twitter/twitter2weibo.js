// ==UserScript==
// @name 微博美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2023.09.22.01
// @description 中国人就用微博
// @author userElaina
// @license MIT
// @match *://*.twitter.com/*
// @match *://*.x.com/*
// @grant none
// ==/UserScript==

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function f_succ(f, msSleep = 500, maxCount = 10) {
    let count = 0;
    while (true) {
        if (f()) {
            return true;
        }
        count++;
        if (count > maxCount) {
            return false;
        }
        await sleep(msSleep);
    }
}

(async function () {
    // change title
    await f_succ(() => {
        let t = document.title;
        t = t.replace(/[\xA0\u1680\u180e\u2000\u200a\u202f\u205f\u3000]/g, ' ');
        t = t.replace(/\(\d\)/g, '').trim();
        if (t === 'X' || t === 'Twitter') {
            document.title = '微博';
            return true;
        }
        if (t.endsWith(' / X') || t.endsWith(' / Twitter')) {
            document.title = '微博-' + t.substring(0, t.length - 4);
            return true;
        }
        return false;
    });

    // change icon
    await f_succ(() => {
        let icon = document.head.querySelector('[rel="shortcut icon"]');
        if (icon === null) {
            return false;
        }
        icon.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA17SURBVHja7Jt7cJVlfsc/z/ue+8kdkriBREQSLkUDAS3IegldFLugVlqQdIRRZGrZTi+URTtbl03tDDtot5TdAdzpum4dpHba9ZJVblnLAhpFJCyWu0lwAdNA9ORyzsm5vOd9+sf7kBxOzi0BKjPwmzmTyZvnec/7+76/2/P9/SKklFzPonGdyw0AbgBwA4AbANwA4HoW29mqSV/ft8cE2sgwectbkNGMq+8BngQmAzcBDnU9CnQAJ4EPgL3AKcCfFQBfvw1KhBNkBBApV00DXleKJ5MyYCqwCOgDGoGtwNtA4Np1AU1i+pyEPipAONOuvC+N8oniBuYDrwG/VHuvUQAESL+N6Ik8y6BTP81Xw/yG+4H/AlamWqCvHFH89WJgN4ldcEMU7FUBMIHBx5OzwFigAjCATsAHdCsT1+JiQjKLeAAoBH6N9Q3XUAwAhCNGaE8JSHDPOY/sG7SkE1gCfAuwA8eBHhU1vEAVMB2YDcxMYUt/pZT/23iIxZnKiddGPhIggzquu8/jmXseMwTEhnyXQuXzq4C7Uqz5a+Bf/j8A8KjIPBOYqN6UCRwF3gCODNohQZoCvSiCc8YFnFO6rewwdBkJ/AD4TpK/dakgue9qAXArsFClpEnKZJMFtVXAz5OCYGggBblLW7CV9yXWCG6gErhZuUA78DtVCyTK94H6JNd3AvOA6JWMAbcpP10ClGRYWwSsB06o4uUSVxB2ExnSEfZYYm2QD2wEFgAXE6cJfAr8Cvg3VRBdlH8ASoEVSYqqR4HXr0QazAeeUw+wKgvlL0oesDRV8hN2k9AHJVYcGADhYaAuTvmLqbwa+B7QoNbEy98DBxKuuYDFgPdyAbgP2KaQrhjG/jtTpi+bJPJpAf7/LEdoIOyASFMrWlIF/AL4o7hrPmBtkrWzgcrhAuAA/kYhPvMyA2VypSQId4zosXwCb4zG7HYhHPxSeHkd+FL5/BeqLki0yHUKjIvyHrAnYV0uMHM4AJQCLwE/AnIu04L6MmZHd4zoqTy6/qmSvvdKe42TuXVaIQ+JHO5HYzbwZ0BzwrZx6uCkxUX+XyezwKEGwYlK+buvUOBsUae5ZJKrDjnFaNKr5Rqh0Hsl7SFdnnTN6vzA7NNw3X0efaRxQvaxS5W8d8Ttnw/8RFWRAAeBoLK6fn2GAsAdyr+uZN58P86ENXXvP1BFzCRV2LgBG5KYyDECxMTnob0jX0Fqv4id9Rh6aQjvI2fPyBg/Al5W6wEmALfEAdCmKsr4WFWaLQCzVIoZe4VrhhPAKOBBFZVnJLyhwelTl+XCG5sFselmp/MvpUlURZEmFRNujQO0MG5vNxBKzAbZADDtKimPClYeYMzQC2eexib3CZvcEqewzLBnyMfhyepcfTWUR5n5mMvYvyiu0pyYUIMYKgXG1x2uhP3hdACUK5+vuoYpvTIEdnRLmYS3fAo4Hff7zaoCjZcOLU2e3wDUXO4JDyFSfy5fwtIQ0uy2g85/A5uB/1WB74fAmbi1U5Ok7VOpYsD3gUeGrrDor2KkYYJhgGEgzRj0N2EFaAKh62C3Wz819R6G2qjVZZt5wR3paywl5/GzpvkVqxG8rAjRs0lSeKLsTwbAPFXlDU2kRIbDyFAYkAiXCy0vHy0/F+H1IjwehKYho1HMXj/S78fs6kIGAkjDQDidCKdzAIzsZLdwxGLGWQ/RU25so/uQIY6nWPtpwu8+YE8iAN8A/jlDKhqQmIk0ohCNgsuJ7daxOG6/Deftt2OrHIftplKE12u9aZvNshDTREajyFAY0+fDaG0jcvgw4Y8PEDlxEnp7weFA2O2ZwPgd0IhNYnbb8W+5mZy60+ilYTAlwqZSwkChvFHFtUXqOP48cDiRD9gI/HlGM4/FkMEgUgjsY8bgqr0P99wHcE65HeHxDPUtWmfavj6iR44RfPcdQjsbiba0InTdul9qAJYB+4EeDAFOE0yB/RY/rm91QBj00kg8nyAUuxy+SLTGA3AvFo+el055GQgiIxEcNdV4/3gBnm9/G/0bN13R0B77oh3/a/+O/7WtxM6cQSsoSBU0Q4rZ+RXwNpI2yx0FMiZAgveRMzim9iADySuBiwC4gC2KJEipvNnTg15cTO7yZXgX/gl6aclVzXGRI0fpXvcCoZ2N4PVaATN1oPwflQVe6jd8UyANDe/DZ3BM7U5GtvbT4vcqDi15VjBNzF4/zrtmMGLDejwPzUPL8WZUwO/309nZic/nwzRNnE4nYgjpTy8pxn3/HOjrI/LRfoSmp3OvElVSV2K1xwII66VHjxagFYaxlYcHEa02ZRgLE1iWOHuMYfb24n1sIYXP16Pl56c/3rW0sG3bNnbu3Mnx48fx+XwYhkFBQQHl5eXU1tYyb948pk2bhpZFrNC8XgrWPIc0DHr/9edoebnpQBDqTJGvfvagSxAmgTdHA9Jyh+ClLnCL8qOypKmtuxvP4scoWvs8wpP6rbe2trJ582ZeeeUVLly4kFYpp9PJsmXLeOaZZ6ioyI5Iivl8dD653LKEnKxoiHWKJuvPAzKi3OHOHuiz+pHiTOXEx7AaiYMtv7cX9713M+Knm9HyUsfG7du3s2rVKo4cOTIkH58yZQqvvvoqkydPzmp9aN/7dC590gqIma2nWx2tPxl4oVZgdNzWhWOyD/uEPjSgNmm0j0bRS0ooqP9BWuXfeustFi9ePGTlAQ4dOsSSJUtob2/Par3rm7Nw3jUDGQplU0rnq5gQp5cEIQl/NILA2+X0/mwMmqKzB1t/MEjuE0uxj099Fmpubuapp56iq6tr2JG+ubmZdevWZb3eNXs2xGLZls2/P4h0FSByDKsp2+pFA0YPUj4UwjZqFJ6HH0p9CgmHefbZZ+ns7Mz4FDabjXHjxmGzJU8yDQ0NnDp1KisA7OOrwOHIFoDRKVlnXSIcJlochTRg/sEgzjuno48qS3nnHTt2sHv37oxP4Ha7WbNmDQ0NDTz++ONJ17S1tXHw4MGsANDy8hEuJ9I0s1kezUCSYBu0QN3YPn48wuFIufGdd94hErm0cVdYWMj8+fOpqqqira2NrVu3YrfbefTRR5kwYQJ5KWKJaZqcO3cuuzNXMICMRK2iKLOcBiKZABhcH2kaYuSIlJt6e3s5efLkpYzpHXewefNmqqur0XUd0zSpq6tj0aJFLF26lLKyMhobG1OfBbJ7oxitrchQCJGbm83yj9Owzv0AnCaxqyMlBFNT9oFAgEBgYPSmuLiYjRs3UlNTE4ehxuzZs3niiSd44YUXMj5pSUl2ZXVoz74BQiV9HAgCv8noUiR2TDQNTJPo6dP97jAoENnt2O0DTd/a2lqmT5+edO2YMZkpv9LSUiZNyjytFj1xktCefWhudzZBsAE4nA0ADYl+IhwOIh8fxEyR3goLCykrK7sEkFSybdu2jIrNmDGD6urqjOt6Nr1ErLMTMvu/D/hpEho8KQCfKhD6zV94PESPHSX0flPyTZpGbe1A/dTU1MSBAwcSjhAxNmzYwLvvvpv2AbxeLytWrEgLIkDgjTcJvvkWwu3KxlNexuoHZj5wrRxRbKiGwqL+nKlpYBgYLW145v0hwu0etLGiooJdu3bR0dGBz+dj//79eDwegsEgx48f58UXX2Tt2rUZg9vq1atZvnx5euaz6UO+Wv13SL8f4coIwG+w5gFC2QAQT4g8h9XmHojM3b3kLF5I4bofIhyD31BjYyMLFiygp6en/1pubi5+v59s/hPl6aefZv369TidqYcEQ3v38eXK72KeO2dF/vT3PYQ1PNGa9ZE7bkxuv+LMpvSjY7cRbm6GYB/OWTMH5d6xY8dSWVnJ3r178futydTE2iCV2dfX11NfX59Wef+Wrfie+R7m+fPZKH8Q+FPVD2A4ABjADpUSq/vrAV0n9OGHxE5/jrNmClpC/p00aRJz586lvb2djo4OQqHUlldUVMSDDz7Ipk2bqKurS1kaR9tO07Wmnt4NP0ZGIhaxml72YI3mnBgyk59kSMqFNVHxF/0MkZRIvx9bVSV531mB+4E5SYmRpqYmduzYweHDh+no6MAwDBwOB6NGjaK6upo5c+akTJdWkdNG8O0GercoLjAnJ9Ox1wB+hjUG08kwJN2U2JOKUBjbzwn6/QjAedcMPA8/hOuee7BVlKcslqLRKC6XC1eawCX9AcKffEJo9276tu8i+tlnCJcb4fWkrEOUHAP+Eat3OWzJNCY3DviuMi8XQkA0ihkIIBwObBXlOGpqcE6fhmPqFGwVo9EKCtPT393dxL74gujRY4QP/ZbIwUNEP2vB9H2FsNktxTUtnb/7FX2/Efj8conXbOYENay+/UrFsBRc5AplJIKMxUDT0HNz0EYWo5eWoBUVoRUVInTlQYaB6fNh+nzEOs5jfvklpt9vNVQ0DWy2gUZIasU7sAYsN2VT4V1JABIJhkWKRfo9LrampbTihBGDmGGZbqL5apr10fWBfmBmVqcba7J0O/AfkLLtNWwZ6ozQR+pzk7KKbwI1CDEZIYqFQwPhyHCezVgfnAN+q77nfZWee69W7+FKjMoWKUAmAOPVZwzWNNmIQYSLggFrzL0Tq53dgjXheUwVMe1Y0+BXXcSN/x2+zuUGANc7AP83APHcrE+nF6XdAAAAAElFTkSuQmCC";
        return true;
    });

    // change title loop
    f_succ(() => {
        let t = document.title;
        t = t.replace(/[\xA0\u1680\u180e\u2000\u200a\u202f\u205f\u3000]/g, ' ');
        t = t.replace(/\(\d\)/g, '').trim();
        if (t === 'X' || t === 'Twitter') {
            document.title = '微博';
        } else if (t.endsWith(' / X') || t.endsWith(' / Twitter')) {
            document.title = t.substring(0, t.length - 4) + ' - 微博';
        }
        return false;
    }, 2000, 2147483647);

    // change logo
    f_succ(() => {
        let logo = document.querySelector('h1[class="css-175oi2r r-1awozwy r-1pz39u2 r-1loqt21 r-6koalj r-16y2uox r-1777fci r-4wgw6l"]');
        if (logo === null) {
            return false;
        }
        logo.childNodes[0].childNodes[0].innerHTML = '<svg height="40px" width="40px" version="1.1" viewBox="0 0 512 512" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp" aria-hidden="true" xml:space="preserve"> <path style="fill:#EA533B;" d="M403.51,247.992c12.189-23.721,13.499-45.899,3.546-63.137 c-10.316-17.868-31.605-28.033-59.944-28.622c-20.81-0.427-44.439,4.311-68.131,13.528c8.166-27.851,5.532-49.961-7.876-63.369 c-16.113-16.113-44.899-16.666-81.056-1.558c-33.715,14.088-70.764,40.33-104.325,73.889 c-49.982,49.983-83.19,107.958-84.779,147.93C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622s119.798-13.005,163.656-36.622c45.558-24.53,70.648-57.754,70.648-93.547 C468.609,304.067,445.576,272.184,403.51,247.992z"/> <path style="fill:#D93C1C;" d="M260.338,459.932c-61.677,0-119.798-13.005-163.656-36.622 c-45.558-24.53-70.648-57.754-70.648-93.547c0-3.863,0.318-7.825,0.945-11.787c1.589-39.973,34.797-97.947,84.78-147.93 c33.227-33.226,69.87-59.27,103.314-73.458c-7.854,1.823-16.218,4.566-25.023,8.245c-33.715,14.088-70.764,40.33-104.325,73.889 C35.742,228.707,2.534,286.682,0.945,326.654C0.318,330.616,0,334.579,0,338.441c0,35.793,25.09,69.017,70.648,93.547 c43.858,23.617,101.979,36.622,163.656,36.622c48.616,0,95.016-8.086,133.969-23.074 C335.352,454.941,298.529,459.932,260.338,459.932z"/> <path style="fill:#FFFFFF;" d="M364.19,312.032c-2.568-29.565-22.081-55.61-54.944-73.338 c-31.681-17.091-72.302-24.49-114.382-20.835c-42.079,3.656-80.818,17.949-109.076,40.247 c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338c26.389,14.236,58.976,21.748,93.447,21.747 c6.913,0,13.905-0.302,20.934-0.913c42.079-3.654,80.817-17.948,109.075-40.246C352.029,370.616,366.758,341.596,364.19,312.032z"/> <path style="fill:#E5E5E5;" d="M230.36,425.319c-7.029,0.611-14.021,0.913-20.934,0.913c-34.471,0.001-67.059-7.511-93.447-21.747 c-32.863-17.729-52.378-43.774-54.946-73.338c-2.569-29.564,12.161-58.584,41.476-81.715c5.799-4.575,12.046-8.808,18.665-12.687 c-12.993,5.932-24.911,13.095-35.388,21.361c-29.314,23.131-44.045,52.151-41.476,81.715c2.569,29.565,22.082,55.61,54.946,73.338 c26.389,14.236,58.976,21.748,93.447,21.747c6.913,0,13.905-0.302,20.934-0.913c33.445-2.905,64.771-12.535,90.41-27.559 C281.994,416.503,256.841,423.019,230.36,425.319z"/> <path style="fill:#333333;" d="M286.65,312.533c-9.507-39.544-55.55-62.508-102.638-51.189 c-47.088,11.32-77.661,52.703-68.156,92.249c4.682,19.473,18.156,35.492,37.943,45.105c12.283,5.967,26.102,9.003,40.355,9.003 c8.042,0,16.221-0.967,24.339-2.918C265.582,393.462,296.157,352.08,286.65,312.533z"/> <circle style="fill:#FFFFFF;" cx="177.898" cy="351.457" r="30.373"/> <g> <path style="fill:#FFA929;" d="M373.152,117.153c-7.189,0-13.017,5.828-13.017,13.017c0,7.189,5.828,13.017,13.017,13.017 	c26.318,0,47.729,21.411,47.729,47.729c0,7.189,5.828,13.017,13.017,13.017s13.017-5.828,13.017-13.017 C446.914,150.243,413.824,117.153,373.152,117.153z"/> <path style="fill:#FFA929;" d="M364.475,43.39c-3.261,0-6.564,0.108-9.817,0.322c-9.564,0.629-16.808,8.893-16.18,18.458 	c0.629,9.564,8.9,16.804,18.458,16.18c2.498-0.164,5.035-0.248,7.539-0.248c62.206,0,112.813,50.608,112.813,112.813 	c0,7.606-0.759,15.204-2.257,22.581c-1.396,6.875,1.691,14.209,7.576,18.025c5.99,3.884,14.111,3.587,19.829-0.675 	c3.388-2.525,5.774-6.307,6.614-10.445c1.958-9.646,2.95-19.566,2.95-29.487C512,109.571,445.82,43.39,364.475,43.39z"/> </g> <circle style="fill:#FFFFFF;" cx="234.305" cy="321.085" r="17.356"/> </svg>';
        return true;
    });

})();
