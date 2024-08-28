// ==UserScript==
// @name 西瓜视频美化
// @namespace https://github.com/userElaina/this-is-the-China-website
// @version 2023.12.30.2
// @description 中国人就用西瓜视频
// @author userElaina
// @license MIT
// @match *://*.youtube.com/*
// @grant none
// ==/UserScript==

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function f_succ(f, msSleep = 500, maxCount = 10) {
    let count = 0;
    while (true) {
        try {
            if (f()) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
        count++;
        if (count > maxCount) {
            return false;
        }
        await sleep(msSleep);
    }
}

(async function () {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        window.trustedTypes.createPolicy('default', {
            createHTML: (string, sink) => string
        });
    }

    // change title
    await f_succ(() => {
        let split_num = window.location.href.split('/');
        if (split_num.length < 4 || (split_num.length == 4 && split_num[3].length == 0)) {
            document.title = "西瓜视频 - 高清免费在线视频 - 点亮对生活的好奇心";
            return true;
        }
        if (document.title.endsWith('YouTube')) {
            document.title = document.title.replace(/\s-\sYouTube*/g, " - 西瓜视频");
            return true;
        }
        return false;
    });

    // change icon
    await f_succ(() => {
        let icon = document.querySelector('link[rel="icon"]');
        if (icon === null) {
            return false;
        }
        icon.href = 'https://raw.githubusercontent.com/userElaina/this-is-the-China-website/main/youtube2xigua/xigua.ico';
        return true;
    });

    // change title loop
    f_succ(() => {
        let split_num = window.location.href.split('/');
        if (split_num.length < 4 || (split_num.length == 4 && split_num[3].length == 0)) {
            document.title = "西瓜视频 - 高清免费在线视频 - 点亮对生活的好奇心";
        }
        if (document.title.endsWith('YouTube')) {
            document.title = document.title.replace(/\s-\sYouTube*/g, " - 西瓜视频");
        }
        return false;
    }, 2000, 2147483647);

    let xigua_biglogo = '<svg width="118" height="40" viewBox="0 0 118 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M6.69264 20.8286C6.66675 20.5697 6.66675 20.2849 6.66675 20.0001C6.66675 12.6473 12.6473 6.66675 20.0001 6.66675C27.3528 6.66675 33.3334 12.6473 33.3334 20.0001C33.3334 27.3528 27.3528 33.3334 20.0001 33.3334C19.9742 33.3334 19.4823 33.3334 19.4564 33.3334C17.8512 33.2816 16.5308 32.1425 16.2201 30.615C15.6247 27.1457 12.8544 24.4014 9.3593 23.8318C7.88358 23.4952 6.77031 22.2266 6.69264 20.6732C6.69264 20.6214 6.69264 20.5697 6.69264 20.492" fill="url(#paint0_linear)"/><path d="M19.0679 25.0485C21.4498 24.479 23.5468 23.2362 25.2038 21.5275C26.0064 20.699 26.0064 19.301 25.2038 18.4725C23.5468 16.7896 21.4239 15.5469 19.0679 14.9514C17.9028 14.6667 16.7378 15.3398 16.4012 16.479C16.0905 17.5922 15.9093 18.7832 15.9093 20C15.9093 21.2168 16.0905 22.4078 16.4012 23.5469C16.7378 24.6602 17.9287 25.3333 19.0679 25.0485Z" fill="white"/><path d="M56.6603 11.9739H41.4629C41.3334 11.9739 41.204 12.0774 41.204 12.2069L41.1004 13.2684C41.0745 13.3978 41.1781 13.5014 41.3334 13.5014H46.5373C46.4856 13.838 46.2267 15.4431 46.1749 15.8315H41.7477C41.5406 15.8315 41.3593 15.9868 41.3334 16.1939L40.0648 27.6891C40.0389 27.9221 40.2202 28.1033 40.4791 28.1033H54.3043C54.5632 28.1033 54.7703 27.9221 54.7962 27.6891L56.0131 16.1939C56.039 15.9868 55.8836 15.8056 55.6506 15.8056H51.1975L51.4564 13.4755H56.505C56.6344 13.4755 56.738 13.3719 56.738 13.2684L56.8674 12.1551C56.8674 12.0774 56.7898 11.9739 56.6603 11.9739ZM48.039 13.5014H49.9289L49.67 15.8315H47.6765C47.7283 15.4431 47.9872 13.838 48.039 13.5014ZM54.1231 17.359C54.2525 17.359 54.3302 17.4625 54.3302 17.5661L53.3982 26.3946C53.3982 26.4981 53.2946 26.5758 53.1652 26.5758H41.9289C41.8254 26.5758 41.7218 26.4981 41.7477 26.3946L42.6797 17.5661C42.6797 17.4625 42.8092 17.359 42.9127 17.359H45.8383C45.6053 18.4205 45.1911 19.948 44.8804 20.9836C44.5697 21.9156 44.259 22.7441 43.9224 23.469C43.8707 23.5726 43.9483 23.6761 44.0519 23.6761H45.2687C45.4241 23.6761 45.5794 23.5726 45.6312 23.4431C45.7606 23.1583 45.8642 22.8477 45.9936 22.5111C46.149 22.071 46.3043 21.5791 46.4597 21.0871C46.615 20.5952 46.7962 19.7409 46.9257 19.1972C47.0551 18.6535 47.2105 17.9286 47.3399 17.359H49.5147L48.8933 23.3137C48.8674 23.5208 49.0228 23.6761 49.2558 23.6761H52.4661C52.5697 23.6761 52.6474 23.5985 52.6733 23.4949L52.8027 22.304C52.8027 22.2004 52.7509 22.1227 52.6474 22.1227H50.5762L51.094 17.3072L54.1231 17.359Z" fill="black"/><path d="M95.262 18.4464H97.5144L97.0225 23.2102C96.9966 23.3655 97.1261 23.495 97.2814 23.495H98.1876C98.3688 23.495 98.5242 23.3655 98.55 23.1843L99.0419 18.4464H101.709C101.786 18.4464 101.864 18.3946 101.864 18.317L101.993 17.126C101.993 17.0484 101.942 16.9966 101.864 16.9966H99.3785L99.5856 14.9254H101.501C101.579 14.9254 101.657 14.8736 101.657 14.7959L101.786 13.605C101.786 13.5273 101.735 13.4755 101.657 13.4755H99.741L99.8963 12.1034C99.9222 11.9739 99.8187 11.8704 99.6633 11.8704H98.6536C98.5241 11.8704 98.3947 11.9739 98.3688 12.1034L97.851 17.0225H96.5565C96.4789 17.0225 96.4271 16.9707 96.453 16.893L96.8931 12.673C96.919 12.5435 96.8154 12.4399 96.6601 12.4399H95.7021C95.5727 12.4399 95.4432 12.5435 95.4174 12.673L94.8478 17.7474L94.8219 18.0063C94.796 18.2393 95.0031 18.4464 95.262 18.4464Z" fill="black"/><path d="M94.4078 23.5727H95.5469C95.6505 23.5727 95.7282 23.495 95.754 23.4173C95.8576 22.7701 96.1683 20.7766 96.246 19.9999C96.246 19.8704 96.1424 19.7668 96.0129 19.7668H94.9256C94.822 19.7668 94.7443 19.8445 94.7184 19.9481C94.5113 21.7863 94.3301 22.5889 94.2006 23.3397C94.1748 23.4432 94.2783 23.5727 94.4078 23.5727Z" fill="black"/><path d="M108.104 25.592C107.715 24.8671 107.508 24.3751 107.327 23.8315C107.275 23.702 107.172 23.6243 107.042 23.6243H106.24C106.447 23.0806 106.602 22.4852 106.68 21.8897L107.068 17.9803C107.094 17.8509 106.99 17.7473 106.861 17.7473H105.825C105.696 17.7473 105.566 17.8509 105.566 17.9803L105.152 21.8897C105.049 22.537 104.945 23.0548 104.712 23.5984C104.479 24.1421 104.117 24.6599 103.754 25.1518C103.392 25.6696 102.874 26.2392 102.356 26.757C101.942 27.1454 101.605 27.4819 101.139 27.8703C101.01 27.9739 101.087 28.181 101.243 28.181H102.615C102.874 28.181 103.107 28.0774 103.288 27.8962C103.728 27.4819 104.22 27.0159 104.608 26.5499C105.074 25.9803 105.618 25.1518 105.929 24.5046C106.162 25.0224 106.498 25.7214 106.757 26.2392C107.301 27.2748 107.586 27.6891 107.741 27.948C107.845 28.1033 108.052 28.2069 108.259 28.2069H109.424C109.553 28.2069 109.657 28.0256 109.579 27.9221C109.191 27.4302 108.596 26.524 108.104 25.592Z" fill="black"/><path d="M110.33 11.9739H103.34C103.21 11.9739 103.081 12.0774 103.055 12.2069L102.951 13.2425C102.926 13.3719 103.029 13.4755 103.184 13.4755H105.877L105.359 15.0807H103.392C103.184 15.0807 102.977 15.236 102.951 15.4431L102.123 23.236C102.097 23.3655 102.201 23.469 102.356 23.469H103.366C103.495 23.469 103.625 23.3655 103.65 23.236L104.35 16.5305C104.35 16.5046 104.375 16.4528 104.427 16.4528H108.388C108.414 16.4528 108.466 16.4787 108.44 16.5305L107.741 23.236C107.715 23.3655 107.819 23.469 107.974 23.469H108.984C109.113 23.469 109.243 23.3396 109.269 23.2101L110.097 15.4172C110.123 15.2101 109.968 15.0548 109.735 15.0548H106.835L107.327 13.4496H110.123C110.252 13.4496 110.382 13.346 110.408 13.2166L110.511 12.181C110.563 12.1033 110.46 11.9739 110.33 11.9739Z" fill="black"/><path d="M101.502 19.7927C101.217 19.7927 100.725 19.7927 100.466 19.7927C100.337 19.7927 100.233 19.8963 100.207 20.0257C100.13 20.4918 100 21.7345 99.5859 22.6147C98.7833 24.3235 97.5924 25.618 94.382 26.4206C94.2526 26.4464 94.149 26.4982 94.0713 26.5241C93.9419 26.55 93.8124 26.6795 93.8124 26.8089L93.683 27.9222C93.683 28.0257 93.7348 28.1293 93.8124 28.1552C93.8642 28.1811 93.916 28.1811 93.9419 28.1552C100.181 26.4982 101.217 23.8833 101.683 20.0257C101.709 19.9222 101.631 19.7927 101.502 19.7927Z" fill="black"/><path d="M81.9028 22.7442C81.7734 21.9934 81.4368 19.6115 81.3591 18.9383C81.3591 18.8348 81.2556 18.7571 81.152 18.7571H79.987C80.0647 18.5759 81.4627 15.8315 81.6957 15.2879C81.8511 14.9513 82.0064 14.5888 82.1358 14.2523C82.2135 14.0451 82.0582 13.838 81.8511 13.838H80.1941L80.2459 13.4238L80.4012 12.0516C80.4271 11.9222 80.3235 11.8186 80.1682 11.8186H79.1585C79.0291 11.8186 78.8996 11.9222 78.8737 12.0516L78.6925 13.8639H76.4918C76.3624 13.8639 76.2329 13.9675 76.207 14.0969L76.1294 15.1584C76.1035 15.2879 76.207 15.3914 76.3624 15.3914H79.9611C79.4433 16.6859 76.0776 22.1487 75.1973 23.4173C75.1197 23.5468 75.1973 23.7021 75.3527 23.7021H76.6472C76.8025 23.7021 76.9579 23.6244 77.0355 23.495C77.1391 23.3655 78.1229 21.6827 78.2782 21.372L77.5533 27.8963C77.5274 28.0257 77.631 28.1293 77.7863 28.1293H78.8737C79.0032 28.1293 79.1326 28.0257 79.1585 27.8963L79.9352 19.5597C80.0647 20.5953 80.2977 22.2782 80.3753 22.796C80.4012 22.8995 80.4789 22.9513 80.5824 22.9513H81.7216C81.8252 22.9772 81.9287 22.8477 81.9028 22.7442Z" fill="black"/><path d="M91.5599 12H84.1295C83.8965 12 83.7153 12.1812 83.6894 12.3883L82.602 22.7443C82.5761 22.8738 82.6797 22.9773 82.835 22.9773H83.8706C84.0001 22.9773 84.1295 22.8738 84.1554 22.7443L85.1133 13.657C85.1133 13.6052 85.1651 13.5534 85.2428 13.5534H90.1878C90.2395 13.5534 90.2913 13.6052 90.2913 13.657L89.3075 22.7443C89.2816 22.8738 89.3852 22.9773 89.5405 22.9773H90.5502C90.6797 22.9773 90.8091 22.8738 90.835 22.7443L91.9483 12.3883C91.9483 12.1812 91.767 12 91.5599 12Z" fill="black"/><path d="M91.0421 26.6275H88.0907C88.0389 26.6275 88.013 26.6016 88.013 26.5498L88.4531 22.4333C88.479 22.2003 88.2978 21.9932 88.0648 21.9932H87.4175C87.5729 21.3977 87.7023 20.7246 87.78 19.9479L88.2719 15.3912C88.2978 15.2618 88.1942 15.1323 88.0389 15.1323H86.9774C86.8479 15.1323 86.7185 15.2359 86.7185 15.3653L86.2266 19.922C86.0971 21.0352 85.8641 22.1226 85.3722 23.0547C84.3884 24.9705 82.7832 26.498 81.0486 27.8702C80.945 27.9737 80.9709 28.1291 81.1263 28.1291H82.7314C83.0162 28.1291 83.3528 28.0255 83.5858 27.8184C83.8188 27.6113 84.958 26.498 85.4499 25.8249C86.0453 25.0223 86.4596 24.3233 86.7962 23.6242L86.3819 27.5595C86.356 27.8702 86.589 28.155 86.8997 28.155H90.8868C91.0162 28.155 91.1457 28.0514 91.1716 27.8961L91.2751 26.8605C91.2751 26.731 91.1716 26.6275 91.0421 26.6275Z" fill="black"/><path d="M73.9806 11.8961L61.4758 12.4139C61.191 12.4397 60.9321 12.6469 60.9062 12.9317L60.6732 15.1841C60.5696 16.0902 60.4143 17.3071 60.2072 18.3944C60 19.4818 59.767 20.5951 59.4822 21.7342C59.1974 22.8734 58.8609 23.8313 58.4725 24.9705C58.1618 25.8766 57.7994 26.7828 57.411 27.6113C57.2816 27.8961 57.4887 28.1808 57.8253 28.1808H58.4466C58.6538 28.1808 58.9127 28.0514 58.9903 27.8702C59.4046 26.9122 59.7929 25.8508 60.1295 24.8152C60.4919 23.676 60.8026 22.6922 61.0615 21.5789C61.3204 20.4656 61.5016 19.3783 61.657 18.3168C61.8382 17.2553 61.9936 16.0902 62.0712 15.21L62.2266 13.9414L64.8932 13.8378C64.2719 19.2747 62.4078 27.1711 62.3819 27.2488L62.3042 27.4818C62.1748 27.8184 62.4337 28.1808 62.7961 28.1808H68.9838C69.2169 28.1808 69.3722 27.9996 69.3722 27.7666L68.9321 21.5012C68.9321 21.3718 68.8026 21.2423 68.6732 21.2423H67.6376C67.4822 21.2423 67.3787 21.3718 67.3787 21.5271L67.7152 26.5239C67.7152 26.5757 67.6635 26.6533 67.6117 26.6533H64.1942C64.1424 26.6533 64.1165 26.6016 64.1165 26.5498C64.7379 24.0902 65.9288 18.3168 66.4207 13.7601L67.1198 13.7342L70.9774 13.5789C70.9515 13.8378 70.9256 14.0967 70.9256 14.3815C70.589 18.9122 70.7185 23.4171 71.547 27.8702C71.5728 28.0514 71.78 28.2067 71.9871 28.2067H72.8156C73.1521 28.2067 73.2557 27.8961 73.178 27.6113C72.6343 25.1517 72.3754 22.6663 72.2978 20.1808C72.2719 19.0676 72.2719 17.9284 72.2978 16.8151C72.3237 16.2456 72.3495 15.7019 72.3754 15.1323C72.4013 14.8475 72.4013 14.5627 72.4272 14.3038C72.4272 14.1744 72.4013 13.6048 72.479 13.5271L73.7994 13.4495C73.9029 13.4495 74.0065 13.3459 74.0065 13.2423L74.1101 12.1291C74.1877 11.9737 74.0842 11.8702 73.9806 11.8961Z" fill="black"/></g><defs><linearGradient id="paint0_linear" x1="20.0012" y1="6.66675" x2="20.0012" y2="33.3357" gradientUnits="userSpaceOnUse"><stop stop-color="#FA5050"/><stop offset="0.9949" stop-color="#FB0414"/></linearGradient><clipPath id="clip0"><rect width="103.858" height="26.6667" fill="white" transform="translate(6.66675 6.66675)"/></clipPath></defs></svg>';

    // change logo on top left
    f_succ(() => {
        let logo = document.getElementById("logo-icon");
        if (logo === null) {
            return false;
        }
        logo.innerHTML = window.trustedTypes.defaultPolicy.createHTML(xigua_biglogo);
        return true;
    });

    // change logo on top left (hide)
    f_succ(() => {
        let logo = document.getElementById('contentContainer').querySelector('ytd-topbar-logo-renderer').querySelector('a').querySelector('div').querySelector('div');
        if (logo === null) {
            return false;
        }
        logo.innerHTML = xigua_biglogo;
        return true;
    });

})();
