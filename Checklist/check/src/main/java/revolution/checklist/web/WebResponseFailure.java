package revolution.checklist.web;

import com.android.volley.VolleyError;

/**
 * Created by Filipe Mendes on 13/07/2014.
 */
public abstract class WebResponseFailure {
    public abstract void onResponseFailure(VolleyError error);
}
