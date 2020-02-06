class ChatChannel < ApplicationCable::Channel

    def subscribed
    end

    def unsubscribed
        stop_all_streams
    end

    def follow(data)
        stream_from "room_#{data['room_id']}"
    end

    def unfollow
        stop_all_streams
    end

    def message(data)
        ActionCable.server.broadcast "room_#{data['room_id']}", room_id: data['room_id'], sender: data['sender'], content: data['content']
    end

end
