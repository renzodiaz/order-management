class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :resource_not_found

  protected

  def unprocessable_entity!(resource)
    render status: :unprocessable_entity, json: {
      error: {
        message: "Invalid parameters for resource #{resource.class}",
        invalid_params: resource.errors
      }
    }
  end

  def serialize(resource, serializer: nil, **options)
    serializer ||= serializer_for(resource)

    if paginated?(resource)
      serializer.new(
        resource,
        options.merge(meta: pagination_meta(resource))
      ).serializable_hash
    else
      serializer.new(resource, options).serializable_hash
    end
  end

  def serializer_for(resource)
    klass =
      if resource.respond_to?(:klass)
        resource.klass
      else
        resource.class
      end

    "#{klass.name}Serializer".constantize
  end

  def paginated?(resource)
    resource.respond_to?(:current_page) &&
      resource.respond_to?(:total_pages)
  end

  def pagination_meta(resource)
    {
      pagination: {
        current_page: resource.current_page,
        next_page: resource.next_page,
        prev_page: resource.prev_page,
        total_pages: resource.total_pages,
        total_count: resource.total_count
      }
    }
  end
end
