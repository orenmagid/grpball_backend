

class FeedsController < ApplicationController

  before_action :create_enricher

  def user


    feed = StreamRails.feed_manager.get_user_feed(@current_user.id)
    results = feed.get()['results']
    @activities = @enricher.enrich_activities(results)

    render json: @activities

    # serialized_data = ActiveModelSerializers::Adapter::Json.new(
    #     ConversationSerializer.new(conversation)
    #   ).serializable_hash
      # ActionCable.server.broadcast 'user_channel', ActiveModelSerializers::Adapter::Json.new(@activities).serializable_hash
      # head :ok
  end

  def group
    feed = StreamRails.feed_manager.get_user_feed(params[:id])
    results = feed.get()['results']
    @activities = @enricher.enrich_activities(results)
    render json: @activities
  end

  def flat
    feed = StreamRails.feed_manager.get_news_feeds(@current_user.id)[:timeline]
    results = feed.get()['results']
    @activities = @enricher.enrich_activities(results)
    render json: @activities
  end

  def aggregated
    feed = StreamRails.feed_manager.get_news_feeds(@current_user.id)[:timeline_aggregated]
    results = feed.get()['results']
    @activities = @enricher.enrich_aggregated_activities(results)
    render json: @activities
  end

  def notification_group
    feed = StreamRails.feed_manager.get_notification_feed(params[:id])
    results = feed.get()['results']
    @activities = @enricher.enrich_aggregated_activities(results)
    render json: @activities
  end

  def notification_user
    feed = StreamRails.feed_manager.get_notification_feed(@current_user.id)
    results = feed.get()['results']
    @activities = @enricher.enrich_aggregated_activities(results)
    render json: @activities
  end



  def create_enricher
    @enricher = StreamRails::Enrich.new
  end

end
