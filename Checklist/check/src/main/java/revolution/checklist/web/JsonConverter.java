package revolution.checklist.web;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import revolution.checklist.data.model.Category;
import revolution.checklist.data.model.Topic;

/**
 * Created by Filipe Mendes on 13/07/2014.
 */
public class JsonConverter {

    public static Category parseCategory(JSONObject object)
    {
        String id = getString(object,"_id");
        String name = getString(object,"_id");
        String description = getString(object, "description");
        Topic[] topics = parseTopics(getArray(object, "topics"));
        return new Category(id,name,topics,description);
    }

    private static Topic[] parseTopics(JSONArray arr){

        if(arr == null)
            return new Topic[0];

        Topic[] topics = new Topic[arr.length()];

        for(int i = 0; i < arr.length(); i++)
        {
            try {
                topics[i] = parseTopic(arr.getJSONObject(i));
            } catch (JSONException e) {
                topics[i] = null;
            }
        }

        return topics;
    }

    private static Topic parseTopic(JSONObject obj)
    {
        String name = getString(obj,"name");
        String description = getString(obj, "description");
        String[] links = parseUrls(getArray(obj, "links"));
        return new Topic(name,description,links);
    }

    private static String[] parseUrls(JSONArray array){
        if(array == null)
            return new String[0];

        String[] links = new String[array.length()];

        for(int i = 0; i < array.length(); i++)
            links[i] = getString(array,i, "url");

        return links;
    }

    /*
    *
    *       HELPER METHODS
    *
    *
     */
    private static String getString(JSONObject obj, String field)
    {
        try {
            return obj.getString(field);
        }catch (JSONException e){
            return "";
        }
    }

    private static String getString(JSONArray array, int index, String field)
    {
        String str;

        try {
            str = array.getJSONObject(index).getString(field);
        } catch (JSONException e) {
            str = "";
        }

        return str;
    }

    private static JSONArray getArray(JSONObject obj, String field)
    {
        try {
            return obj.getJSONArray(field);
        }catch (JSONException e){
            return null;
        }
    }


}
