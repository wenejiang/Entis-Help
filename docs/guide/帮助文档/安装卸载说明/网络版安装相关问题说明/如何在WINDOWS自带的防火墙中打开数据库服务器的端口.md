---
title: 如何在WINDOWS自带的防火墙中打开数据库服务器的端口
date: 2026-10-15T00:03:16+08:00
lastmod: 2026-11-25T02:58:17+08:00
---

# 如何在WINDOWS自带的防火墙中打开数据库服务器的端口

‍

1. 单击“开始”和“控制面板”，再单击“网络和Internet连接”。
2. 单击“Windows 防火墙设置”。
3. 在“例外”选项卡上的“程序和服务”框中，您可能看到已列出 SQL Server，但是未将它选择为例外。如果您选中该复选框，则 Windows 将打开端口 1433 来放入 TCP 请求。
4. 如未例出,可以通过添加SQL Server程序来打开端口，则请执行下列操作：
5. 单击“添加程序”。
6. 单击“浏览”。
7. 导航到 drive:/Program Files/Microsoft
   SQL Server/MSSQL.1\MSSQL\BINN
8. 将文件 sqlservr.exe 添加到例外列表中。
9. 由于动态端口需要同时开启Sql browser服务,所以需要同时加入1434:upd端口，这是sql browser服务用来实现动态端口所必需的。
