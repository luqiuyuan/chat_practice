class ChatChannel < ApplicationCable::Channel

    def subscribed
    end

    def unsubscribed
        stop_all_streams
    end

    def follow
        stream_from "room_#{params[:room]}"
    end

    def unfollow
        stop_all_streams
    end

    def send_message(data)
        ActionCable.server.broadcast "room_#{params[:room]}", sender: data['sender'], content: data['content']
    end

end
