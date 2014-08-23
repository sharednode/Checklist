package revolution.checklist.web;

/**
 * Created by Filipe Mendes on 12/07/2014.
 */
public class WebRequestInfo {
    /*
    /api/category - GET - Return all categories
    /api/category - POST - Insert a new category
    /api/category/:id - GET - Get category by id
    /api/category/:id - Delete - Delete category by id
    /api/category/:id - PUT - Update category
    */

    private static String ENDPOINT = "http://checklist.azurewebsites.net";
    private static String API = "/api";
    private static String CATEGORY = "/category";

    public static String GET_CATEGORY = String.format(ENDPOINT + API + CATEGORY);
}
