package revolution.checklist.ui.util;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.widget.CheckedTextView;

import revolution.checklist.R;

/**
 * Created by Filipe Mendes on 19/07/2014.
 */
public class RTextView extends CheckedTextView {
    public RTextView(Context context) {
        super(context);
        init(null);
    }

    public RTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(attrs);
    }

    public RTextView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(attrs);
    }

    private void init(AttributeSet attrs) {
        if (attrs!=null) {
            TypedArray a = getContext().obtainStyledAttributes(attrs, R.styleable.RTextView);
            String fontName = a.getString(R.styleable.RTextView_fontName);
            if (fontName!=null) {
                String font = String.format("fonts/%s.ttf",fontName);
                Typeface myTypeface = Typeface.createFromAsset(getContext().getAssets(), font);
                setTypeface(myTypeface);
            }
            a.recycle();
        }
    }
}
