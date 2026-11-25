---
title: Modbus输出关联字段说明
date: 2026-10-13T16:33:34+08:00
lastmod: 2026-10-13T23:41:54+08:00
---

# Modbus输出关联字段说明

本文列出 Modbus 输出配置里「关联字段」可以绑定的字段。配置界面会按对象类型切换字段，可输出二个层面的数据，如选中罐，则按罐级数据类型显示可绑定字段，如选择仪表，则按仪表级数据类型显示可绑定字段，仪表级主要少了计算部份字段，但可以根据不同仪表，

绑定不同字段，如LTD仪表字段会有LTD仪表特有的数据，Plus仪表则可以包含来自于CIU的计算数据

> 功能码： Read input register

## 罐数据（TankData）

对应界面中的罐。包含 TankData 自身以及基类 TankDataValue 上符合筛选的输出属性。

|序号|关联字段|支持类型|说明|
| -------------------------------------------------------------| -------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------|
|1|液位状态|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|2|罐高(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|3|最大安全高度(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|4|最小安全高度(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|5|罐最大容量(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|6|最大安全容量(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|7|最小安全容量(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|8|9:自定义数据1|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|9|9:自定义数据2|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|10|9:自定义数据3|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|11|主仪表地址|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|12|产品代码|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|13|体积流速(m3/H)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|14|液位流速(mm/H)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|15|质量流速(T/H)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|16|作业剩余时间预测(秒)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|17|通讯是否中断|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|18|实际作业状态|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|19|多点温度值(自动重复项)(C)|Int16、Int32、Single、Double|会自动占用总记录数对应的地址位|
|20|多点温度高度(自动重复项)(mm)|Int16、Int32、Single、Double|会自动占用总记录数对应的地址位|
|21|多点温度偏差(false:0,true:1)|Int16、Int32、UInt16、UInt32||
|22|多点密度值(自动重复项)(kg/m3)|Int16、Int32、Single、Double|会自动占用总记录数对应的地址位|
|23|多点密度高度(自动重复项)(mm)|Int16、Int32、Single、Double|会自动占用总记录数对应的地址位|
|24|多点密度偏差(false:0,true:1)|Int16、Int32、UInt16、UInt32||
|25|液位(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|26|水位(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|27|杂质(水份)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|28|产品温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|29|环境大气温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|30|罐壁温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|31|罐顶气相温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|32|视温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|33|标准温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|34|罐底压力(KPa)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|35|压力2(KPa)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|36|气相压力(KPa)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|37|体积修正系数(VCF)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|38|密度修正系数(DCF)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|39|热膨胀系数|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|40|HIMS密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|41|伺服密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|42|测量密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|43|视密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|44|标准密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|45|罐壁温度校正体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|46|可用空容(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|47|总空容(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|48|可用产品(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|49|毛总体积GTOV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|50|总体积TOV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|51|产品毛体积GOV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|52|产品标准体积GSV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|53|产品标准净体积NSV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|54|气相转液相体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|55|产品总标准净体积TNSV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|56|水体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|57|静压修正体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|58|毛重质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|59|空气中质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|60|真空中质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|61|空气中汽相质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|62|罐顶汽相质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|63|浮顶修正体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|64|浮顶修正质量(T)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|65|是否分层(false:0,true:1)”|Int16、Int32、UInt16、UInt32|适用于LNG版本，新版本加入|

## 普通仪表（GaugeData）

对应雷达、伺服、Modbus 及未单独分类的仪表。下列字段为 GaugeData 及其基类上的关联字段。LTD 与 Plus 仪表在界面上同样包含这些字段。

|序号|关联字段|支持类型|说明|
| -------------------------------------------------------------| -------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------------| -------------------------------------------------------------------------------------------|
|1|仪表状态|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|2|1:液位(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|3|液位状态|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|4|浮子位置(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|5|6:水位(mm)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|6|环境大气温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|7|罐壁温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|8|2:产品温度(C)|Int16、Int32、Single、Single Swapped、Double、Double Swapped||
|9|气相温度(C)|Int16、Int32、Single、Single Swapped、Double、Double Swapped||
|10|通讯中断|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|11|9:自定义数据1|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|12|9:自定义数据2|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|13|9:自定义数据3|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|14|视温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|15|视密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|16|标准密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|17|测量密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|18|多点伺服密度1(kg/m3)|Int16、Int32||
|19|多点伺服密度高度1(mm)|Int16、Int32||
|20|多点伺服密度2(kg/m3)|Int16、Int32||
|21|多点伺服密度高度2(mm)|Int16、Int32||
|22|多点伺服密度3(kg/m3)|Int16、Int32||
|23|多点伺服密度高度3(mm)|Int16、Int32||
|24|多点伺服密度4(kg/m3)|Int16、Int32||
|25|多点伺服密度高度4(mm)|Int16、Int32||
|26|多点伺服密度5(kg/m3)|Int16、Int32||
|27|多点伺服密度高度5(mm)|Int16、Int32||
|28|多点伺服密度6(kg/m3)|Int16、Int32||
|29|多点伺服密度高度6(mm)|Int16、Int32||
|30|多点伺服密度7(kg/m3)|Int16、Int32||
|31|多点伺服密度高度7(mm)|Int16、Int32||
|32|多点伺服密度8(kg/m3)|Int16、Int32||
|33|多点伺服密度高度8(mm)|Int16、Int32||
|34|多点伺服密度9(kg/m3)|Int16、Int32||
|35|多点伺服密度高度9(mm)|Int16、Int32||
|36|多点伺服密度10(kg/m3)|Int16、Int32||
|37|多点伺服密度高度10(mm)|Int16、Int32||
|38|多点密度值(自动重复项)(kg/m3)|Int16、Int32、Single、Double||
|39|多点密度高度(自动重复项)(mm)|Int16、Int32、Single、Double||
|40|多点温度值(自动重复项)(C)|Int16、Int32、Single、Double||
|41|多点温度高度(自动重复项)(mm)|Int16、Int32、Single、Double||
|42|温度值1-->温度值16(C)|Int16、Int32、Single、Double|当前被隐藏，后续版本可以重新加入|
|43|温度点高1-->温度点高16(mm)|Int16、Int32、Single、Double|当前被隐藏，后续版本可以重新加入|

## LTD 仪表（GaugeLTDData）（适用于LNG版本）

仅列出 LTD 仪表在 GaugeData 之外新增的关联字段。界面选择 LTD 仪表时，还会包含上一节已经列出的普通仪表字段。

|序号|关联字段|支持类型|说明|
| -------------------------------------------------------------| --------------------------------------------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------|
|1|LTD 工作模式|Int16、UInt16||
|2|通讯中断|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|3|LTD当前点温度|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|4|LTD当前点密度|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|5|LTD分层测量类型|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|6|LTD分层测量点数|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|7|分层测量时间之月份|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|8|分层测量时间之日期|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|9|分层测量时间之小时|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|10|分层测量时间之分钟|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|11|LTD Profile位置(自动重复项)|Int16、UInt16||
|12|LTD Profile温度(自动重复项)|Int16||
|13|LTD Profile密度(自动重复项)|Int16、UInt16||
|14|探头动作状态|Int16、UInt16||
|15|LTD仪表扩展复合状态|UInt32||
|16|轮盘转动报警无效|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|17|LTD密度低报|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|18|LTD密度高报|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|19|LTD温度低报|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|20|LTD温度高报|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|21|LTD分层温度偏差|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|22|LTD分层密度偏差|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|23|profile平均密度|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped|新版本加入|
|24|profile平均温度|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped|新版本加入|

## Plus 仪表（GaugePLusData）

仅列出 Plus 仪表在 GaugeData 之外新增的关联字段。界面选择 Plus 仪表时，还会包含普通仪表一节已经列出的字段。

|序号|关联字段|支持类型|说明|
| ----| --------------------------| ----------------------------------------------------------------------------| ----|
|1|Plus标准密度(kg/m3)(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|2|Plus体积修正系数(VCF)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|3|Plus毛总体积GTOV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|4|Plus静压修正体积(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|5|Plus总体积TOV(m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|6|视密度(kg/m3)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
|7|视温度(C)|Int16、Int32、UInt16、UInt32、Single、Single Swapped、Double、Double Swapped||
