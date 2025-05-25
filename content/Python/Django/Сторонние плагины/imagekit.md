---
subtitle: 
tags: 
date created: 2025-05-25T21:42
date modified: 2025-05-25T21:45
---
Позволяет использовать вместо обычного ImageField ProcessedImageField  
Синтаксис:  
```python  
ProcessedImageField(verbose_name='Логотип', blank=True, null=True,    
                    processors=[    
	                    Transpose(), # Исправляет ориентацию по EXIF  
                        ResizeToFit(width=500, upscale=False) # Максимальная ширина 500  
                                ],    
                    format='WEBP', # Формат сохранения  
                    options={'quality': 80}, default='base_event_logo.webp')  
```