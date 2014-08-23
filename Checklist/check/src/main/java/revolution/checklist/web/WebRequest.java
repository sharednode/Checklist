package revolution.checklist.web;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.LinkedList;
import java.util.List;

import revolution.checklist.ChecklistApplication;
import revolution.checklist.R;
import revolution.checklist.data.model.Category;

/**
 * Created by Filipe Mendes on 13/07/2014.
 */
public class WebRequest {
    private Context mContext;

    public WebRequest(Context context)
    {
        mContext = context;
    }

    public void getAllCategories(final WebResponse<List<Category>> webResponse)
    {
        JsonArrayRequest jsonObjReq = new JsonArrayRequest  (WebRequestInfo.GET_CATEGORY, new Response.Listener<JSONArray>()
        {
                @Override
                public void onResponse(JSONArray response) {
                    List<Category> categories = new LinkedList<Category>();

                    for (int i = 0; i < response.length(); i++){
                        try {
                            categories.add(JsonConverter.parseCategory(response.getJSONObject(i)));
                        }
                        catch (JSONException e) {
                            Log.d(ChecklistApplication.TAG, "Error: " + e.getMessage());
                        }
                    }
                    webResponse.onResponse(categories);
                }
            }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d(ChecklistApplication.TAG,error.toString());
                VolleyLog.d(ChecklistApplication.TAG, "Error: " + error.getMessage());
                Toast.makeText(mContext, mContext.getString(R.string.error_request),Toast.LENGTH_SHORT).show();
            }
        });

        // Adding request to request queue

        ChecklistApplication.getInstance().addToRequestQueue(jsonObjReq, ChecklistApplication.TAG);
    }
}
