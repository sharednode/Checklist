package revolution.checklist.ui.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import butterknife.ButterKnife;
import butterknife.InjectView;
import revolution.checklist.R;
import revolution.checklist.data.model.Category;

/**
 * Created by Filipe Mendes on 11/05/2014.
 */
public class CategoryAdapter extends ArrayAdapter<Category>{

    private String[] mCategories;

    public CategoryAdapter(Context context,String[] categories) {
        super(context, R.layout.fragment_navigation_drawer);
        mCategories = categories;
    }

    @Override
    public int getCount() {
        return mCategories.length;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        CategoryHolder holder;

        if(convertView == null)
        {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.row_category_drawer, null);
            holder = new CategoryHolder(convertView);
            convertView.setTag(holder);
        }else{
            holder = (CategoryHolder)convertView.getTag();
        }
        holder.title.setText(mCategories[position]);
        return convertView;
    }

    static class CategoryHolder {
        @InjectView(R.id.category_title) TextView title;
        public CategoryHolder(View v)
        {
            ButterKnife.inject(this,v);
        }
    }
}
