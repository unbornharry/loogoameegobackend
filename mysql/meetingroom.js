let pool = require('./connections');

module.exports = {
    createMeetingroom: function(buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, callback){
        pool.query("INSERT INTO meetingroom (Meetingroomid, buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, createdtime, updatedtime) " +
            "VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            [buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateMeetingroom: function(Meetingroomid, buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, callback){
        pool.query("UPDATE meetingroom SET " +
            "buildingid = ?, " +
            "floorid = ?, " +
            "Meetingroomname = ?, " +
            "Meetingroomdisplayname = ?, " +
            "deviceid = ?, " +
            "occupantcount = ?, " +
            "occupancy = ?, " +
            "location = ? " +
            " WHERE Meetingroomid = ?", [buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateMeetingroomOccupantcount: function(deviceid, occupantcount, callback){
        pool.query("UPDATE meetingroom SET " +
            "occupantcount = ? " +
            " WHERE deviceid = ?", [occupantcount, deviceid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    incrementMeetingroomOccupantCount: function(deviceid, callback){
        pool.query("UPDATE meetingroom SET " +
            "occupantcount = occupantcount + 1 " +
            " WHERE deviceid = ?", [deviceid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    decrementMeetingroomOccupantCount: function(deviceid, callback){
        pool.query("UPDATE meetingroom SET " +
            "occupantcount = occupantcount - 1 " +
            " WHERE deviceid = ? AND occupantcount > 0", [deviceid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    reserveMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE meetingroom SET " +
            "reserved = ? " +
            " WHERE meetingroomid = ?", ['reserved', Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    unreserveMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE meetingroom SET " +
            "reserved = ? " +
            " WHERE meetingroomid = ?", ['unreserved', Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    occupyMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE meetingroom SET " +
            "occupied = ? " +
            " WHERE meetingroomid = ?", [1, Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    unoccupyMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE meetingroom SET " +
            "occupied = ? " +
            " WHERE meetingroomid = ?", [0, Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    deleteMeetingroom: function(Meetingroomid, callback){
        pool.query("DELETE FROM meetingroom WHERE Meetingroomid = ?", [Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomByMeetingroomid: function(Meetingroomid, callback){
        pool.query("SELECT * FROM meetingroom WHERE Meetingroomid = ?", [Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomsByFloorid: function(floorid, callback){
        pool.query("SELECT * FROM meetingroom WHERE floorid = ?", [floorid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomsByBuildingid: function(buildingid, callback){
        pool.query("SELECT * FROM meetingroom WHERE buildingid = ?", [buildingid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    }
};