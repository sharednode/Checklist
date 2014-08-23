package revolution.checklist.data.model;

/**
 * Created by Filipe Mendes on 02/05/2014.
 */
public class Category {

    private Topic[] mTopics;
    private String mName;
    private String mId;
    private String mDescription;

    public Category(String id,String name) {
        mTopics = new Topic[0];
        mName = name;
        mId = id;
    }
    public Category(String id,String name, Topic[] topics, String description)
    {
        mTopics = topics;
        mName = name;
        mId = id;
        mDescription = description;
    }

    public Topic[] getTopics() {
        return mTopics;
    }
    public String getName(){return mName;}
    public Topic getTopicAt(int i){
        return mTopics[i];
    }
    public String getDescription() {return mDescription;}
    public String getId() {return mId;}

}
