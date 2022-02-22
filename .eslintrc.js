// 规则可参考：https://cloud.tencent.com/developer/section/1135633
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser":"babel-eslint", //解决有可能产生的开发环境与eslint解析功能不兼容
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style":[0,"windows"],//强制使用Windows行结束符
        "quotes": ["error", "double"],
        "no-console": 0, //不禁用console
        "no-debugger": 2, //禁用debugger
        "no-var": 0, //对var警告
        "semi": 0, //不强制使用分号
        "no-irregular-whitespace": 0, //不规则的空白不允许
        "no-dupe-args": 2, //函数参数不能重复
        "no-multi-spaces": 0, //不能用多余的空格
        "no-multi-str": 2, //字符串不能用\换行
        "no-multiple-empty-lines": [2, {
            "max": 2
        }], //空行最多不能超过2行
        // "no-alert": 0,//不能有alert
        "no-tabs": 0,
        "no-dupe-keys": 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-unused-vars": [2, {"vars": "all", "args": "after-used"}], //不能有声明后未被使用的变量或参数
        "react/display-name": 0, //防止在React组件定义中丢失displayName
        "react/forbid-prop-types": [2, {"forbid": ["any"]}], //禁止某些propTypes
        "react/jsx-boolean-value": 2, //在JSX中强制布尔属性符号
        "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
        "react/jsx-curly-spacing": [2, {"when": "never", "children": true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
        "react/jsx-indent-props": [2, 4], //验证JSX中的props缩进
        "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
        "react/jsx-max-props-per-line": [1, {"maximum": 1}], // 限制JSX中单行上的props的最大数量
        // "react/jsx-no-bind": 0, //JSX中不允许使用箭头函数和bind
        "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
        "react/jsx-no-literals": 0, //防止使用未包装的JSX字符串
        "react/jsx-no-undef": 1, //在JSX中禁止未声明的变量
        "react/jsx-pascal-case": 0, //为用户定义的JSX组件强制使用PascalCase
        "react/jsx-sort-props": 2, //强化props按字母排序
        "react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
        "react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
        "react/no-danger": 0, //防止使用危险的JSX属性
        "react/no-direct-mutation-state": 2, //防止this.state的直接变异
        // "react/no-multi-comp": 2, //防止每个文件有多个组件定义
        "react/no-unknown-property": 2, //防止使用未知的DOM属性
        "react/prefer-es6-class": 2, //为React组件强制执行ES5或ES6类
        "react/prop-types": 0, //防止在React组件定义中丢失props验证
        // "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
        "react/self-closing-comp": 0, //防止没有children的组件的额外结束标签
        "react/sort-comp": 2, //强制组件方法顺序
        "no-extra-boolean-cast": 0, //禁止不必要的bool转换
        "react/no-array-index-key": 0, //防止在数组中遍历中使用数组key做索引
        "react/no-deprecated": 1, //不使用弃用的方法
        "react/jsx-equals-spacing": 2, //在JSX属性中强制或禁止等号周围的空格
    }
};
