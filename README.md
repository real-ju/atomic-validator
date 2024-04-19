# 原子表单验证器

易用的表单验证器，大小仅有 4KB。

### 安装

```shell
npm install atomic-validator
```

### 使用

#### 验证表单

```javascript
import validator from "atomic-validator";

const formData = {
  name: "",
  mobile: 123456, // 字段值为非字符串，在匹配规则时（指定了rule字段）会被String()强制转换为字符串
  password: "error",
  city: ["重庆", "南岸"],
};

const formRules = {
  name: [
    { required: true, message: "姓名不能为空" }, // 指定required字段表示值不能为空，故对number和boolean类型无效
  ],
  mobile: [
    { required: true, message: "姓名不能为空" },
    { rule: "mobile", message: "手机号格式错误" }, // rule字段的值为字符串表示预设规则名
  ],
  password: [
    { rule: /abc/, message: "密码错误" }, // rule字段的值为正则表达式，使用该自定义正则表达式匹配
  ],
  city: [
    { validator: validator.customize.arrNotEmpty, message: "请选择城市" }, // 内置验证器。可自定义验证器函数，参数为字段值，返回boolean值
  ],
};

const rst = validator.validate(formData, formRules); // 所有字段验证通过，则返回true，否则返回错误数组

console.log(rst);

// 输出：
[
  { field: "name", message: "姓名不能为空" },
  { field: "mobile", message: "手机号格式错误" },
  { field: "password", message: "密码错误" },
];
```

#### 验证单个字段

```javascript
import validator from "atomic-validator";

// validator.single() - 多条验证规则
const value = "7777777";
const rules = [
  { required: true, message: "姓名不能为空" },
  { rule: "mobile", message: "手机号格式错误" },
];

const rst = validator.single(value, rules); // "手机号格式错误"

// validator.match() - 单条验证规则
const value = "abc";
const rst = validator.match(value, /abc/); // true
```

### API

| 字段      | 说明                     | 参数                                      | 返回值           |
| --------- | ------------------------ | ----------------------------------------- | ---------------- |
| validate  | 验证表单                 | (data: `表单对象`, rules: `规则数组`)      | true\|`错误数组` |
| single    | 验证单个字段（多条规则） | (value: `字段值`, rules: `规则数组`)       | true\|`错误信息` |
| single    | 验证单个字段（单条规则） | (value: `字段值`, rule: RegExp \| string) | true\|`错误信息` |
| customize | 内置验证器               | -                                         | -                |

### 预设规则（增加中）

| 规则名 | 说明   |
| ------ | ------ |
| mobile | 手机号 |

### 内置验证器（增加中）

| 函数名      | 说明           |
| ----------- | -------------- |
| arrNotEmpty | 判断数组不为空 |
