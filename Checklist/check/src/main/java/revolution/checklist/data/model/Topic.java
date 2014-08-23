package revolution.checklist.data.model;

import java.util.UUID;

/**
 * Created by Filipe Mendes on 02/05/2014.
 */
public class Topic {
    private String mName;
    private String mDescription;
    private String[] mLinks;
    private boolean mChecked;
    private String mId;

    public Topic(String id, String name,String description, String[] links)
    {
        mId = id;
        mName = name;
        mDescription = description;
        mLinks = links;
        mChecked = false;
    }

    public Topic(String name,String description, String[] links)
    {
        this(UUID.randomUUID().toString(),name,description,links);
    }

    public String getId() {return mId;}
    public String getName() {return mName;}
    public String getDescription() {return mDescription;}
    public String[] getLinks() {return mLinks;}
    public boolean isChecked() {return mChecked;}
    public void setChecked(boolean state){mChecked = state;}
}
