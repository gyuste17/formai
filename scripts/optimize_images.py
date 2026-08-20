import os
import sys
from PIL import Image

public_dir = r"c:\Users\gyust\GY Antigravity\formai\public"

def optimize_image(filepath, max_dim=None, quality=85):
    try:
        orig_size = os.path.getsize(filepath)
        with Image.open(filepath) as img:
            webp_path = os.path.splitext(filepath)[0] + '.webp'
            
            w, h = img.size
            if max_dim and (w > max_dim or h > max_dim):
                if w > h:
                    new_w = max_dim
                    new_h = int(h * (max_dim / w))
                else:
                    new_h = max_dim
                    new_w = int(w * (max_dim / h))
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img.save(webp_path, 'WEBP', quality=quality, method=6)
            else:
                img.convert('RGB').save(webp_path, 'WEBP', quality=quality, method=6)
            
            new_size = os.path.getsize(webp_path)
            print(f"Converted {os.path.basename(filepath)}: {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB ({((orig_size-new_size)/orig_size)*100:.1f}% saved)")
    except Exception as e:
        print(f"Error {filepath}: {e}")

# Process logos
for root, dirs, files in os.walk(os.path.join(public_dir, 'logos')):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')) and not f.endswith('.webp'):
            fp = os.path.join(root, f)
            if 'favicon' in f.lower():
                optimize_image(fp, max_dim=128, quality=90)
            elif 'herramientas' in root:
                optimize_image(fp, max_dim=140, quality=85)
            elif 'colaboradores' in root or 'clientes' in root:
                optimize_image(fp, max_dim=280, quality=85)
            elif 'formai' in root.lower():
                optimize_image(fp, max_dim=360, quality=85)
            else:
                optimize_image(fp, max_dim=360, quality=85)

print("Image optimization complete!")
