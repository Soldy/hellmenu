'use strict';

const hellMenuClass = function(main_element_){
    this.addSection = function(id,title){
        _addSection(id,title);
    };
    this.addSubSection = function(menu,title){
        _addSubSection(menu,title);
    };
    this.addSub = function(id, title, action, icon_class,  section, subs){
        _addSub(id, title, action, icon_class,  section, subs);
    };
    this.add = function(id, title, action, icon_class,  section, subs){
        _add(id, title, action, icon_class,  section, subs);
    };
    this.render = function(){
        _render();
    };
    this.hide = function(){
        _menu.className = _class('hide');
    };
    this.show = function(){
        _menu.className = _class('shell');
    };
    this.id = function(name){
        return _id(name);
    };
    this.setTitle = function(id, title){
        return _menuTextChange(id, title); 
    };
    this.setIcon = function(id, icon){
        return _menuIconChange(id, icon); 
    };
    const _e = main_element_;
    const _menu  = document.createElement('div');
    const _list_menus = {};
    const _list_sections = {}; 
    const _list_sub_sections = {}; 
    const _addMenu = function(id, title, action, icon_class,  section){
        _list_menus[id] = {
            id,
            title,
            action,
            icon_class,
            section
        };
    };
    const _add = function(id, title, action, icon_class,  section, subs){
        if(typeof section !== 'string')
            section = 'main';
        _addMenu(id, title, action, icon_class,  section);
        _list_menus[id].subs = _subCopy(subs);
        _menuAddToSection(id,section);
    };
    const _addSub = function(id, title, action, icon_class,  section, subs){
        if (typeof section === 'undefined')
            throw Error('Missing parent menu section');
        _addMenu(id, title, action, icon_class,  section);
        _list_menus[id].subs = _subCopy(subs);
        _menuAddToSubSection(id,section);
    };
    const _addSection = function(id,title){
        if(typeof _list_sections[id] === 'undefined')
            _list_sections[id] = {
                menus:[]
            };
        if(typeof title === 'string')
            _list_sections[id].title = title;
    };
    const _addSubSection = function(menu,title){
        if(typeof _list_sub_sections[menu] === 'undefined')
            _list_sub_sections[menu] = {
                menus:[]
            };
        if(typeof title === 'string')
            _list_sub_sections[menu].title = title;
    };
    const _id = (name)=>{
        return ('hellmenu_id_'+name);
    };
    const _class = (name)=>{
        return ('hellmenu_'+name);
    };
    const _subClass = (name)=>{
        return ('hellmenu_sub_'+name);
    };
    const _subCopy = (sub)=>{
        if(typeof sub === 'undefined')
            return [];
        return sub;
    };
    const _sectionElement = function(id, class_){
        let section  = document.createElement('section');
        section.className = class_;
        section.setAttribute('id', _id(id));
        return section;
    };
    const _section = function(id){
        let section = _sectionElement(id, _class('section'));
        for(let i of _list_sections[id].menus){
            section.appendChild(
                _menuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
            if(typeof _list_sub_sections[i] === 'undefined')
                continue;
            section.appendChild(
                _subSection(i)
            );
        }
        return section;
    };
    const _subSection = function(id){
        let section = _sectionElement(id, _subClass('section'));
        for(let i of _list_sub_sections[id].menus)
            section.appendChild(
                _subMenuPoint(
                    _list_menus[i].id,
                    _list_menus[i].title,
                    _list_menus[i].action,
                    _list_menus[i].icon_class,
                    _list_menus[i].subs
                )
            );
        return section;
    };
    const _menuElements = function(id, menu_class, icon_class, text_class, title_text, action, subs){
        const menu = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('a');
        menu.className = menu_class;
        icon.className  = icon_class;
        title.className = text_class;
        title.appendChild(
            document.createTextNode(title_text)
        );
        menu.appendChild(
            icon
        );
        menu.appendChild(
            title
        );
        menu.setAttribute('id', _id(id));
        icon.addEventListener(
            'click',
            action,
            false
        );
        title.addEventListener(
            'click',
            action,
            false
        );
        if(Array.isArray(subs))
            for(let i of subs)
                menu.appendChild(
                    _subPoint(i.id, i.icon_class, i.action)
                );
        return menu;
    };
    const _menuPoint = function(id, title_text, action, icon_class, subs){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        return _menuElements(
            id,
            _class('line'),
            _class('menuitem_icon '+icon_class),
            _class('text'),
            title_text,
            action,
            subs
        );
    };
    const _subMenuPoint = function(id, title_text, action, icon_class, subs){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        return _menuElements( 
            id,
            _subClass('line'),
            _subClass('menuitem_icon '+icon_class),
            _subClass('text'),
            title_text,
            action,
            subs
        );
    };
    const _subPoint=function(id,icon_class,action){
        const sub = document.createElement('span');
        sub.setAttribute('id', id);
        sub.addEventListener(
            'click',
            action,
            false
        );
        return sub;

    };
    const _menuTextChange = function(id, title){
        const el = (
            document.getElementById(_id(id))
        ).getElementsByTagName('a')[0];
        el.textContent= title.toString();
    };
    const _menuIconChange = function(id, icon){
        const el = (
            document.getElementById(_id(id))
        ).getElementsByTagName('span')[0];
        let className = el.className;
        className = (className.split(' '))[0];
        el.className = (className+' '+icon);
    };
    const _menuRemoveFormSection = function(menu){
        if(typeof _list_menus[menu].section !== 'string')
            return ;
        const section = _list_menus[menu].section;
        let index = 0;
        if(typeof _list_sections[section] !== 'undefined'){
            index = _list_sections[
                section
            ].menus.indexOf(menu);
            if(index !== -1 )
                _list_sections[
                    section
                ].menus.splice(index, 1);
        }
        if(typeof _list_sub_sections[section] !== 'undefined'){
            index = _list_sub_sections[
                section
            ].menus.indexOf(menu);
            if(index !== -1 )
                _list_sub_sections[
                    section
                ].menus.splice(index, 1);
        }
    };
    const _menuAddToSection = function (menu,section){
        _addSection(section);
        _menuRemoveFormSection(menu);
        _list_sections[section].menus.push(menu);
        _list_menus[menu].section = section;
    };
    const _menuAddToSubSection = function (menu,section){
        _addSubSection(section);
        _menuRemoveFormSection(menu);
        _list_sub_sections[section].menus.push(menu);
        _list_menus[menu].section = section;
    };
    const _render = function(){
        _menu.innerHTML = '';
        for(let i in _list_sections)
            _menu.appendChild(
                _section(i)
            );
    };
    // constructor
    _e.appendChild(_menu);
};


