import os
import django

from musculib_API import settings ; settings.configure()

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'musculib.settings')
# django.setup()

from django.utils import translation


def translated(language, text):
    try:
        translation.activate(language)
        text = translation.gettext(text)

        return text
    except:
        import pdb ; pdb.set_trace()


language = 'de'
text = 'hello'

translated(language, text)