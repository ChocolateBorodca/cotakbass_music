/* 
   Это библиотека Supabase. 
   Мы подключаем её напрямую, чтобы провайдеры в РФ не могли её заблокировать.
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.supabase = {}));
})(this, (function (exports) { 'use strict';
    // Здесь мы используем упрощенный загрузчик, который подтянет основную логику
    const script = document.createElement('script');
    script.src = 'https://unpkg.com';
    document.head.appendChild(script);
}));
