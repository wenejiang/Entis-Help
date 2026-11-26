"""生成 favicon：参考 rTankGroup_48.ico 的两个储罐布局，银灰色金属质感，透明背景，无水印。"""

from PIL import Image, ImageDraw, ImageFilter
import math
import os

S = 6  # 超采样倍率
SIZE = 64 * S

img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def draw_tank(cx, cy_top, rx, ry, height, body_light, body_dark, top_inner, top_edge):
    cx, cy_top, rx, ry, height = cx*S, cy_top*S, rx*S, ry*S, height*S
    body_bottom = cy_top + height
    steps = 140

    # 柱身：圆柱受光（中间偏左亮、两侧暗），纵向轻微加深
    # 按整数像素逐行绘制，避免重复绘制产生横向条纹
    for y in range(int(cy_top), int(cy_top + height)):
        t = (y - cy_top) / height
        vert = 1.0 - 0.10 * t
        for x in range(int(cx - rx), int(cx + rx)):
            u = (x - (cx - rx)) / (2 * rx)
            lf = 0.58 + 0.42 * math.sin(math.pi * u)
            c = tuple(lerp(body_dark[k], body_light[k], lf) for k in range(3))
            c = tuple(min(255, int(c[k] * vert)) for k in range(3))
            draw.point((x, y), fill=(*c, 255))

    # 罐底椭圆：实体金属底，后亮前暗
    for i in range(80):
        t = i / 79
        yoff = -ry + 2*ry*t
        half_w = rx * math.sqrt(max(0.0, 1 - (yoff/ry)**2))
        shade = lerp(body_light[0]-30, body_dark[0]-8, t)
        c = (shade, shade+6, shade+16)
        draw.line([(cx-half_w, body_bottom+yoff), (cx+half_w, body_bottom+yoff)],
                  fill=(*c, 255), width=max(1, S//2))

    # 顶面椭圆：外缘暗、中心亮
    for i in range(steps):
        t = i / (steps - 1)
        r, rr = rx*(1-t), ry*(1-t)
        c = tuple(lerp(top_edge[k], top_inner[k], t) for k in range(3))
        draw.ellipse([cx-r, cy_top-rr, cx+r, cy_top+rr], fill=(*c, 255))
    draw.ellipse([cx-rx, cy_top-ry, cx+rx, cy_top+ry], outline=(138,145,156,255), width=S)
    draw.arc([cx-rx*0.78, cy_top-ry*0.78, cx+rx*0.78, cy_top+ry*0.78],
             200, 320, fill=(255,255,255,190), width=2*S)


# 参考图布局：左后罐略高靠后，右前罐略低靠前，共两个罐
# 图形四周保留安全边距，避免浏览器标签页 16x16 显示时贴边被裁切
draw_tank(23, 13, 13, 6, 23,
          (198, 205, 214), (92, 100, 114), (242, 246, 250), (146, 154, 166))
draw_tank(42, 20, 13, 6, 25,
          (222, 228, 236), (104, 112, 126), (250, 252, 255), (160, 168, 180))

img = img.filter(ImageFilter.GaussianBlur(radius=0.4*S))
final = img.resize((64, 64), Image.LANCZOS)

out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public')
os.makedirs(out_dir, exist_ok=True)
final.save(os.path.join(out_dir, 'favicon.png'))
final.save(os.path.join(out_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print('done')
