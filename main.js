// ==UserScript==
// @name		HKU Moodle Enhance
// @namespace	uni_dark_theme
// @version		1.10
// @description	Simple Dark Theme for HKU Moodle, with some extra features
// @icon		https://images2.imgbox.com/b3/67/Aq5XazuW_o.png
// @author		Kelvin
// @match		*://moodle.hku.hk/*
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_addElement
// @grant		GM_registerMenuCommand
// @grant		unsafeWindow
// ==/UserScript==

(function () {
    'use strict';
    var el;
    var toggle;
    var css;
    var togglecss;
    var cfg_color = "#c0c0c0";
    var cfg_bgclr = "#212121";
    var cfg_bghoverclr = "#686868"
    var cfg_coursetitle = "#d8e2ec";
    var cfg_visclr = '#d8e2ec';
    var cfg_active = true;
    function activate(yes, prev_active) {
        var logo = document.getElementsByClassName("logo");
        console.log(logo);
        if (prev_active && el) {
            console.info("Removing dark mode...");
            el.remove();
            logo[0].innerHTML = '<img src="https://moodle.hku.hk/pluginfile.php/1/theme_hkumoodle3/logo/1673322479/hkumoodle-logo.png" class="img-responsive" alt="logo">';
        }
        if (yes) {
            make_css();
            console.info("adding dark mode...");
            el = addStyle(css);
            //change logo
            logo[0].innerHTML = '<img src="https://images2.imgbox.com/7b/12/jLLqQAIT_o.png" class="img-responsive" alt="logo">';
            console.info(el);
        }
    }
    function toggleDT() {
        cfg_active = !cfg_active;
        activate(cfg_active, !cfg_active);
        if (!cfg_active) {
            localStorage.removeItem('active');
        }
        else {
            localStorage.setItem('active', "1");
        }
    }
    function make_togglecss(){
        togglecss = `
        .switch {
        font-size: 17px;
        position: relative;
        display: inline-block;
        width: 64px;
        height: 34px;
        }

        .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        }

        .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #73C0FC;
        transition: .4s;
        border-radius: 30px;
        }

        .slider:before {
        position: absolute;
        content: "";
        height: 30px;
        width: 30px;
        border-radius: 20px;
        left: 2px;
        bottom: 2px;
        z-index: 2;
        background-color: #e8e8e8;
        transition: .4s;
        }

        .sun svg {
        position: absolute;
        top: 6px;
        left: 36px;
        z-index: 1;
        width: 24px;
        height: 24px;
        }

        .moon svg {
        fill: #73C0FC;
        position: absolute;
        top: 5px;
        left: 5px;
        z-index: 1;
        width: 24px;
        height: 24px;
        }

        /* .switch:hover */.sun svg {
        animation: rotate 15s linear infinite;
        }

        @keyframes rotate {

        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
        }

        /* .switch:hover */.moon svg {
        animation: tilt 5s linear infinite;
        }

        @keyframes tilt {

        0% {
            transform: rotate(0deg);
        }

        25% {
            transform: rotate(-10deg);
        }

        75% {
            transform: rotate(10deg);
        }

        100% {
            transform: rotate(0deg);
        }
        }

        .input:checked + .slider {
        background-color: #183153;
        }

        .input:focus + .slider {
        box-shadow: 0 0 1px #183153;
        }

        .input:checked + .slider:before {
        transform: translateX(30px);
        }
		`;
        //////////////
    }
    function make_css() {
        ////////////// Main thing, the style!:
        css = `
        *{
            color: `+ cfg_coursetitle +` !important;
            background-color: `+ cfg_bgclr +` !important;
        }
        table#explaincaps tbody>tr:nth-child(odd)>td, table#defineroletable tbody>tr:nth-child(odd)>td, table.grading-report tbody>tr:nth-child(odd)>td, table#listdirectories tbody>tr:nth-child(odd)>td, table.rolecaps tbody>tr:nth-child(odd)>td, table.userenrolment tbody>tr:nth-child(odd)>td, table#form tbody>tr:nth-child(odd)>td, form#movecourses table tbody>tr:nth-child(odd)>td, #page-admin-course-index .editcourse tbody>tr:nth-child(odd)>td, .forumheaderlist tbody>tr:nth-child(odd)>td, table.flexible tbody>tr:nth-child(odd)>td, .generaltable tbody>tr:nth-child(odd)>td, table#explaincaps tbody>tr:nth-child(odd)>th, table#defineroletable tbody>tr:nth-child(odd)>th, table.grading-report tbody>tr:nth-child(odd)>th, table#listdirectories tbody>tr:nth-child(odd)>th, table.rolecaps tbody>tr:nth-child(odd)>th, table.userenrolment tbody>tr:nth-child(odd)>th, table#form tbody>tr:nth-child(odd)>th, form#movecourses table tbody>tr:nth-child(odd)>th, #page-admin-course-index .editcourse tbody>tr:nth-child(odd)>th, .forumheaderlist tbody>tr:nth-child(odd)>th, table.flexible tbody>tr:nth-child(odd)>th, .generaltable tbody>tr:nth-child(odd)>th{
            background-color: `+ cfg_bgclr +` !important;
        }
        .user-enroller-panel .uep-search-results .users tbody tr:hover>td, .user-enroller-panel .uep-search-results .cohorts tbody tr:hover>td, table.grading-report tbody tr:hover>td, .forumheaderlist tbody tr:hover>td, .generaltable tbody tr:hover>td, table.flexible tbody tr:hover>td, .category_subcategories tbody tr:hover>td, table#modules tbody tr:hover>td, table#permissions tbody tr:hover>td, .user-enroller-panel .uep-search-results .users tbody tr:hover>th, .user-enroller-panel .uep-search-results .cohorts tbody tr:hover>th, table.grading-report tbody tr:hover>th, .forumheaderlist tbody tr:hover>th, .generaltable tbody tr:hover>th, table.flexible tbody tr:hover>th, .category_subcategories tbody tr:hover>th, table#modules tbody tr:hover>th, table#permissions tbody tr:hover>th{
            background-color: `+ cfg_bghoverclr +` !important;
        }
        .path-mod-assign td.submissionnotgraded, .path-mod-assign div.submissionnotgraded{
            background-color: `+ cfg_bgclr +` !important;
        }
        .activity-navigation #next-activity-link, .activity-navigation #prev-activity-link{
            background-color: #d8e2ec !important;
            color: #727272 !important;
        }
        .form-inline{
            display: none;
        }
        .course-home .course-title h2{
            background-color: #00000000 !important;
        }
        .card{
            background-color: `+ cfg_bgclr +` !important;
        }
        .filemanager .fp-navbar{
            background-color: `+ cfg_bgclr +` !important;
        }
        .block .card-title{
            color: white !important;
        }
        .block ul.block_tree a, .block_book_toc li a, .block_site_main_menu li a, .breadcrumb a, .instancename, .navbottom .bookexit, .navbottom .booknext, .navbottom .bookprev{
            color: white !important;
        }
        table#form td.submit, .form-buttons, .path-admin .buttons, #fitem_id_submitbutton, .fp-content-center form+div, div.backup-section+form, #fgroup_id_buttonar{
            background-color: `+ cfg_bgclr +` !important;
        }
        .block_navigation .block_tree .tree_item{
            color: white !important;
        }
        .calendar_event_course{
            background-color: `+ cfg_bgclr + ` !important;
        }
        element.style{
            color: white !important;
        }
        #page-mod-scorm-player .breadcrumb-button a, a, a.active, a:focus, a:visited{
            color: #b5b5b5  !important;
        }
        .coursebox .content .course-btn .btn.btn-primary{
            background-color: black !important;
        }
        .content h3.sectionname{
            background: `+ cfg_bgclr + ` !important;
        }
        .course-home.banner{
            background-color: `+ cfg_bgclr + ` !important;
        }
        .jsenabled .moodle-actionmenu[data-enhance] .menu{
            background-color: `+ cfg_bgclr + ` !important;
        }
        #sidebar .block-region{
            background-color: `+ cfg_bgclr + ` !important;
        }
        body.sidebar-open #sidebar .block-region{
            background-color: `+ cfg_bgclr + ` !important;
        }
        .block{
            background: `+ cfg_bgclr + ` !important;
        }
        .profileblock .welcome_userpicture{
            display: none !important;
        }
        .activity-information .btn.btn-outline-secondary:active, .activity-information .btn.btn-outline-secondary:hover, .activity-information .btn.btn-outline-success{
            background-color: black !important;
        }
        .activity-information .btn.btn-outline-secondary {
            color: white !important;
        }
        .mod_turnitintooltwo .ui-widget-header {
            background-color: `+ cfg_bgclr + ` !important;
        }
        #mod_turnitintooltwo_course_browser_table .odd .sorting_1, .mod_turnitintooltwo_submissions_data_table .odd .sorting_1{
            background-color: `+ cfg_bgclr + ` !important;
        }
        #page{
            background-color: `+ cfg_bgclr + ` !important;
        }
        #page-header{
            background-color: `+ cfg_bgclr + ` !important;
        }
        #sidebar-btn{
            background-color: #00b48d !important;
        }
        #wrapper{
            background-color: `+ cfg_bgclr + ` !important;
        }
        #frontpage-category-combo, #frontpage-category-names, #frontpage-course-list, #site-news-forum{
            background-color: `+ cfg_bgclr + ` !important;
        }
		:visited, a:hover{
			color: `+ cfg_visclr + ` !important;
		}
		input:focus,textarea:focus,select:focus{
			outline: 1px solid `+ cfg_visclr + ` !important;
		}
        .course-home > img{
            display: none !important;
        }
        .course-home.banner{
            color: `+ cfg_visclr + ` !important;
        }
        .btn:hover, .btn:focus{
            background-color: #d8e2ec !important;
            color: #727272 !important;
        }
        button, .btn{
            background-color: #000000 !important;
        }
        .fp-viewbar{
            background-color: `+ cfg_bgclr + ` !important;
        }
        .moodle-dialogue-base .moodle-dialogue-wrap{
            background-color: `+ cfg_bgclr + ` !important;
        }
        .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd, .moodle-dialogue-base .moodle-dialogue-wrap .moodle-dialogue-hd.yui3-widget-hd{
            background: `+ cfg_bgclr + ` !important;
        }
        textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input{
            background-color: black !important;
        }
        .col-form-label{
            display: none !important;
        }
        .filemanager .fp-license select, .file-picker .fp-setlicense select{
            display: none !important;
        }
        .mr-auto, .mx-auto{
            display: none !important;
        }
        .moodle-dialogue .fp-repo.nav-item.active{
            background-color: #333a35 !important;
		`;
        //////////////
    }
    function addStyle(aCss) {
        return GM_addElement(document.documentElement, 'style', { textContent: aCss });
        /*let style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.textContent = aCss;
        document.documentElement.appendChild(style);
        return style;*/
    };
    function toggleButton() {
        var html = '<label class="switch">';
        html += '<span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>';
        html += '<span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>';
        html += '<input type="checkbox" class="input" name="darkmodetoggle">'
        html += '<span class="slider"></span>'
        html += '</label>';

        const toggleElm = document.createElement("div");
        toggleElm.style = "position: relative; right: 40px; float: right; ";
        toggleElm.innerHTML = html;
        return toggleElm;
    }
    async function main() {
        if (!document.getElementsByClassName("courses frontpage-course-list-enrolled")) {
            console.error("Tampermonkey script Moodle course hider: Cannot find courseListElems");
            return;
        }
        const myCoursesTitleElm = document.getElementById("page-header-nav");
        const toggleElm = toggleButton();
        myCoursesTitleElm.appendChild(toggleElm);
        var checkbox = document.querySelector("input[name=darkmodetoggle]");
        switch (localStorage.getItem('active')) {
            case "true": // back-compatibility
            case "1":
                cfg_active = true;
                checkbox.checked = true;
                activate(cfg_active, !cfg_active);
                break;
            default:
                cfg_active = false;
                break;
        }
        console.info("adding toggle...");
        make_togglecss();
        toggle = addStyle(togglecss);
        console.info(toggle);
        checkbox.addEventListener('change', function() {
        if (this.checked) {
            toggleDT();
        } else {
            toggleDT();
        }
        });
    }
    main();
})();
