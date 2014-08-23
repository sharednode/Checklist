package revolution.checklist.web;

/**
 * Created by Filipe Mendes on 13/07/2014.
 */
public abstract class WebResponse<T> {
    public abstract void onResponse(T values);
}
