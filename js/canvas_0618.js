var context;

// Check for the canvas tag onload. 
if(window.addEventListener) 
{ 
	window.addEventListener('load', function () 
	{
		
		screenToOriginalState();

		
		//Also, the user has to make a main window before anything else, so disable all other tool choices
		var toolz = document.getElementById("selector").getElementsByTagName("option");
		for (var i = 1; i < toolz.length; i++) {
			toolz[i].disabled = true; 
		}
		
		//This hides the button used for redrawing the canvas
		document.getElementById("deleteAndRedraw").style.display = "none";
		
		//Variable declarations
		var canvas, canvaso, contexto; 
		var tool; 
		var tooltype;
		var valuesSet = false;
		var w;
		var h;
		var offsetX = -1000;
		var offsetY;
		var iconX;
		var iconY;
			
		var textWidth;
		var textHeight;
		
		var tool_default = 'rect'; 
		var color;
		var mainWindowBackgroundColor;
		var objectsToMake = new Array();
		var existingObjects = new Array();
		var usedNames = new Array();
			
		var checkBoxCoords = new Array();
		var radioButtonCoords = new Array();
		var comboCoords = new Array();
		var spinCoords = new Array();
		
		var gridSize = 1;
		var somethingMissing = false;
		
		var listBoxGibberish = ["asparagus", "apples", "avacado", "alfalfa", "acorn squash", "almond", "arugala", "artichoke", "applesauce", "asian noodles", "antelope", "ahi tuna", "albacore tuna", "Apple juice", "Avocado roll", "Bruscetta", "bacon", "black beans", "bagels", "baked beans", "BBQ", "bison", "barley", "beer", "bisque", "bluefish", "bread", "broccoli", "buritto", "babaganoosh", "Cabbage", "cake", "carrots", "carne asada", "celery", "cheese", "chicken", "catfish", "chips", "chocolate", "chowder", "clams", "coffee", "cookies", "corn", "cupcakes", "crab", "curry", "cereal", "chimichanga", "dates", "dips", "duck", "dumplings", "donuts", "eggs", "enchilada", "eggrolls", "Englishmuffins", "edimame", "eel sushi", "fajita", "falafel", "fish", "franks", "fondu", "French toast", "French dip", "Garlic", "ginger", "gnocchi", "goose", "granola", "grapes", "green beans", "Guancamole", "gumbo", "grits", "Graham crackers", "ham", "halibut", "hamburger", "cheeseburgers", "bacon cheeseburgers", "honey", "huenos rancheros", "hash browns", "hot dogs", "haiku roll", "hummus", "ice cream", "Irish stew", "Indian food", "Italian bread", "jambalaya", "jelly", "jam", "jerky", "jalapeño", "kale", "kabobs", "ketchup", "kiwi", "kidney beans", "kingfish", "lobster", "Lamb", "Linguine", "Lasagna", "Meatballs", "Moose", "Milk", "Milkshake", "Noodles", "Ostrich", "Pizza", "Pepperoni", "Porter", "Pancakes", "Quesadilla", "Quiche", "Reuben", "Spinach", "Spaghetti", "Tater tots", "Toast", "Venison", "Waffles", "Wine", "Walnuts"]

		//These are all the colors for the Vue colorpicker
		var colors = [
				{hex: '#F0F8FF', name: 'AliceBlue'},
				{hex: '#FAEBD7', name: 'AntiqueWhite'},
				{hex: '#FFEFDB', name: 'AntiqueWhite1'},
				{hex: '#EEDFCC', name: 'AntiqueWhite2'},
				{hex: '#CDC0B0', name: 'AntiqueWhite3'},
				{hex: '#8B8378', name: 'AntiqueWhite4'},
				{hex: '#00FFFF', name: 'agua'},
				{hex: '#7FFFD4', name: 'aquamarine'},
				{hex: '#7FFFD4', name: 'aquamarine1'},
				{hex: '#76EEC6', name: 'aquamarine2'},
				{hex: '#66CDAA', name: 'aquamarine3'},
				{hex: '#458B74', name: 'aquamarine4'},
				{hex: '#F0FFFF', name: 'azure'},
				{hex: '#F0FFFF', name: 'azure1'},
				{hex: '#E0EEEE', name: 'azure2'},
				{hex: '#C1CDCD', name: 'azure3'},
				{hex: '#838B8B', name: 'azure4'},
				{hex: '#F5F5DC', name: 'beige'},
				{hex: '#FFE4C4', name: 'bisque'},
				{hex: '#FFE4C4', name: 'bisque1'},
				{hex: '#EED5B7', name: 'bisque2'},
				{hex: '#CDB79E', name: 'bisque3'},
				{hex: '#8B7D6B', name: 'bisque4'},
				{hex: '#000000', name: 'black'},
				{hex: '#FFEBCD', name: 'BlanchedAlmond'},
				{hex: '#0000FF', name: 'blue'},
				{hex: '#0000FF', name: 'blue1'},
				{hex: '#0000EE', name: 'blue2'},
				{hex: '#0000CD', name: 'blue3'},
				{hex: '#00008B', name: 'blue4'},
				{hex: '#8A2BE2', name: 'BlueViolet'},
				{hex: '#A52A2A', name: 'brown'},
				{hex: '#FF4040', name: 'brown1'},
				{hex: '#EE3B3B', name: 'brown2'},
				{hex: '#CD3333', name: 'brown3'},
				{hex: '#8B2323', name: 'brown4'},
				{hex: '#DEB887', name: 'burlywood'},
				{hex: '#FFD39B', name: 'burlywood1'},
				{hex: '#EEC591', name: 'burlywood2'},
				{hex: '#CDAA7D', name: 'burlywood3'},
				{hex: '#8B7355', name: 'burlywood4'},
				{hex: '#5F9EA0', name: 'CadetBlue'},
				{hex: '#98F5FF', name: 'CadetBlue1'},
				{hex: '#8EE5EE', name: 'CadetBlue2'},
				{hex: '#7AC5CD', name: 'CadetBlue3'},
				{hex: '#53868B', name: 'CadetBlue4'},
				{hex: '#7FFF00', name: 'chartreuse'},
				{hex: '#7FFF00', name: 'chartreuse1'},
				{hex: '#76EE00', name: 'chartreuse2'},
				{hex: '#66CD00', name: 'chartreuse3'},
				{hex: '#458B00', name: 'chartreuse4'},
				{hex: '#D2691E', name: 'chocolate'},
				{hex: '#FF7F24', name: 'chocolate1'},
				{hex: '#EE7621', name: 'chocolate2'},
				{hex: '#CD661D', name: 'chocolate3'},
				{hex: '#8B4513', name: 'chocolate4'},
				{hex: '#FF7F50', name: 'coral'},
				{hex: '#FF7256', name: 'coral1'},
				{hex: '#EE6A50', name: 'coral2'},
				{hex: '#CD5B45', name: 'coral3'},
				{hex: '#8B3E2F', name: 'coral4'},
				{hex: '#6495ED', name: 'CornflowerBlue'},
				{hex: '#FFF8DC', name: 'cornsilk'},
				{hex: '#FFF8DC', name: 'cornsilk1'},
				{hex: '#EEE8CD', name: 'cornsilk2'},
				{hex: '#CDC8B1', name: 'cornsilk3'},
				{hex: '#8B8878', name: 'cornsilk4'},
				{hex: '#DC143C', name: 'crymson'},
				{hex: '#00FFFF', name: 'cyan'},
				{hex: '#00FFFF', name: 'cyan1'},
				{hex: '#00EEEE', name: 'cyan2'},
				{hex: '#00CDCD', name: 'cyan3'},
				{hex: '#008B8B', name: 'cyan4'},
				{hex: '#00008B', name: 'DarkBlue'},
				{hex: '#008B8B', name: 'DarkCyan'},
				{hex: '#B8860B', name: 'DarkGoldenrod'},
				{hex: '#FFB90F', name: 'DarkGoldenrod1'},
				{hex: '#EEAD0E', name: 'DarkGoldenrod2'},
				{hex: '#CD950C', name: 'DarkGoldenrod3'},
				{hex: '#8B6508', name: 'DarkGoldenrod4'},
				{hex: '#A9A9A9', name: 'DarkGray'},
				{hex: '#006400', name: 'DarkGreen'},
				{hex: '#A9A9A9', name: 'DarkGrey'},
				{hex: '#BDB76B', name: 'DarkKhaki'},
				{hex: '#8B008B', name: 'DarkMagenta'},
				{hex: '#556B2F', name: 'DarkOliveGreen'},
				{hex: '#CAFF70', name: 'DarkOliveGreen1'},
				{hex: '#BCEE68', name: 'DarkOliveGreen2'},
				{hex: '#A2CD5A', name: 'DarkOliveGreen3'},
				{hex: '#6E8B3D', name: 'DarkOliveGreen4'},
				{hex: '#FF8C00', name: 'DarkOrange'},
				{hex: '#FF7F00', name: 'DarkOrange1'},
				{hex: '#EE7600', name: 'DarkOrange2'},
				{hex: '#CD6600', name: 'DarkOrange3'},
				{hex: '#8B4500', name: 'DarkOrange4'},
				{hex: '#9932CC', name: 'DarkOrchid'},
				{hex: '#BF3EFF', name: 'DarkOrchid1'},
				{hex: '#B23AEE', name: 'DarkOrchid2'},
				{hex: '#9A32CD', name: 'DarkOrchid3'},
				{hex: '#68228B', name: 'DarkOrchid4'},
				{hex: '#8B0000', name: 'DarkRed'},
				{hex: '#E9967A', name: 'DarkSalmon'},
				{hex: '#8FBC8F', name: 'DarkSeaGreen'},
				{hex: '#C1FFC1', name: 'DarkSeaGreen1'},
				{hex: '#B4EEB4', name: 'DarkSeaGreen2'},
				{hex: '#9BCD9B', name: 'DarkSeaGreen3'},
				{hex: '#698B69', name: 'DarkSeaGreen4'},
				{hex: '#483D8B', name: 'DarkSlateBlue'},
				{hex: '#2F4F4F', name: 'DarkSlateGray'},
				{hex: '#97FFFF', name: 'DarkSlateGray1'},
				{hex: '#8DEEEE', name: 'DarkSlateGray2'},
				{hex: '#79CDCD', name: 'DarkSlateGray3'},
				{hex: '#528B8B', name: 'DarkSlateGray4'},
				{hex: '#2F4F4F', name: 'DarkSlateGrey'},
				{hex: '#00CED1', name: 'DarkTurquoise'},
				{hex: '#9400D3', name: 'DarkViolet'},
				{hex: '#FF1493', name: 'DeepPink'},
				{hex: '#FF1493', name: 'DeepPink1'},
				{hex: '#EE1289', name: 'DeepPink2'},
				{hex: '#CD1076', name: 'DeepPink3'},
				{hex: '#8B0A50', name: 'DeepPink4'},
				{hex: '#00BFFF', name: 'DeepSkyBlue'},
				{hex: '#00BFFF', name: 'DeepSkyBlue1'},
				{hex: '#00B2EE', name: 'DeepSkyBlue2'},
				{hex: '#009ACD', name: 'DeepSkyBlue3'},
				{hex: '#00688B', name: 'DeepSkyBlue4'},
				{hex: '#696969', name: 'DimGray'},
				{hex: '#696969', name: 'DimGrey'},
				{hex: '#1E90FF', name: 'dodger blue'},
				{hex: '#1E90FF', name: 'DodgerBlue'},
				{hex: '#1E90FF', name: 'DodgerBlue1'},
				{hex: '#1C86EE', name: 'DodgerBlue2'},
				{hex: '#1874CD', name: 'DodgerBlue3'},
				{hex: '#104E8B', name: 'DodgerBlue4'},
				{hex: '#B22222', name: 'firebrick'},
				{hex: '#FF3030', name: 'firebrick1'},
				{hex: '#EE2C2C', name: 'firebrick2'},
				{hex: '#CD2626', name: 'firebrick3'},
				{hex: '#8B1A1A', name: 'firebrick4'},
				{hex: '#FFFAF0', name: 'FloralWhite'},
				{hex: '#228B22', name: 'forest green'},
				{hex: '#228B22', name: 'ForestGreen'},
				{hex: '#FF00FF', name: 'fuchsia'},
				{hex: '#DCDCDC', name: 'gainsboro'},
				{hex: '#F8F8FF', name: 'GhostWhite'},
				{hex: '#FFD700', name: 'gold'},
				{hex: '#FFD700', name: 'gold1'},
				{hex: '#EEC900', name: 'gold2'},
				{hex: '#CDAD00', name: 'gold3'},
				{hex: '#8B7500', name: 'gold4'},
				{hex: '#DAA520', name: 'goldenrod'},
				{hex: '#FFC125', name: 'goldenrod1'},
				{hex: '#EEB422', name: 'goldenrod2'},
				{hex: '#CD9B1D', name: 'goldenrod3'},
				{hex: '#8B6914', name: 'goldenrod4'},
				{hex: '#00FF00', name: 'green'},
				{hex: '#00FF00', name: 'green1'},
				{hex: '#00EE00', name: 'green2'},
				{hex: '#00CD00', name: 'green3'},
				{hex: '#008B00', name: 'green4'},
				{hex: '#ADFF2F', name: 'GreenYellow'},
				{hex: '#BEBEBE', name: 'grey'},
				{hex: '#000000', name: 'grey0'},
				{hex: '#030303', name: 'grey1'},
				{hex: '#050505', name: 'grey2'},
				{hex: '#080808', name: 'grey3'},
				{hex: '#0A0A0A', name: 'grey4'},
				{hex: '#0D0D0D', name: 'grey5'},
				{hex: '#0F0F0F', name: 'grey6'},
				{hex: '#121212', name: 'grey7'},
				{hex: '#141414', name: 'grey8'},
				{hex: '#171717', name: 'grey9'},
				{hex: '#1A1A1A', name: 'grey10'},
				{hex: '#1C1C1C', name: 'grey11'},
				{hex: '#1F1F1F', name: 'grey12'},
				{hex: '#212121', name: 'grey13'},
				{hex: '#242424', name: 'grey14'},
				{hex: '#262626', name: 'grey15'},
				{hex: '#292929', name: 'grey16'},
				{hex: '#2B2B2B', name: 'grey17'},
				{hex: '#2E2E2E', name: 'grey18'},
				{hex: '#303030', name: 'grey19'},
				{hex: '#333333', name: 'grey20'},
				{hex: '#363636', name: 'grey21'},
				{hex: '#383838', name: 'grey22'},
				{hex: '#3B3B3B', name: 'grey23'},
				{hex: '#3D3D3D', name: 'grey24'},
				{hex: '#404040', name: 'grey25'},
				{hex: '#424242', name: 'grey26'},
				{hex: '#454545', name: 'grey27'},
				{hex: '#474747', name: 'grey28'},
				{hex: '#4A4A4A', name: 'grey29'},
				{hex: '#4D4D4D', name: 'grey30'},
				{hex: '#4F4F4F', name: 'grey31'},
				{hex: '#525252', name: 'grey32'},
				{hex: '#545454', name: 'grey33'},
				{hex: '#575757', name: 'grey34'},
				{hex: '#595959', name: 'grey35'},
				{hex: '#5C5C5C', name: 'grey36'},
				{hex: '#5E5E5E', name: 'grey37'},
				{hex: '#616161', name: 'grey38'},
				{hex: '#636363', name: 'grey39'},
				{hex: '#666666', name: 'grey40'},
				{hex: '#696969', name: 'grey41'},
				{hex: '#6B6B6B', name: 'grey42'},
				{hex: '#6E6E6E', name: 'grey43'},
				{hex: '#707070', name: 'grey44'},
				{hex: '#737373', name: 'grey45'},
				{hex: '#757575', name: 'grey46'},
				{hex: '#787878', name: 'grey47'},
				{hex: '#7A7A7A', name: 'grey48'},
				{hex: '#7D7D7D', name: 'grey49'},
				{hex: '#7F7F7F', name: 'grey50'},
				{hex: '#828282', name: 'grey51'},
				{hex: '#858585', name: 'grey52'},
				{hex: '#878787', name: 'grey53'},
				{hex: '#8A8A8A', name: 'grey54'},
				{hex: '#8C8C8C', name: 'grey55'},
				{hex: '#8F8F8F', name: 'grey56'},
				{hex: '#919191', name: 'grey57'},
				{hex: '#949494', name: 'grey58'},
				{hex: '#969696', name: 'grey59'},
				{hex: '#999999', name: 'grey60'},
				{hex: '#9C9C9C', name: 'grey61'},
				{hex: '#9E9E9E', name: 'grey62'},
				{hex: '#A1A1A1', name: 'grey63'},
				{hex: '#A3A3A3', name: 'grey64'},
				{hex: '#A6A6A6', name: 'grey65'},
				{hex: '#A8A8A8', name: 'grey66'},
				{hex: '#ABABAB', name: 'grey67'},
				{hex: '#ADADAD', name: 'grey68'},
				{hex: '#B0B0B0', name: 'grey69'},
				{hex: '#B3B3B3', name: 'grey70'},
				{hex: '#B5B5B5', name: 'grey71'},
				{hex: '#B8B8B8', name: 'grey72'},
				{hex: '#BABABA', name: 'grey73'},
				{hex: '#BDBDBD', name: 'grey74'},
				{hex: '#BFBFBF', name: 'grey75'},
				{hex: '#C2C2C2', name: 'grey76'},
				{hex: '#C4C4C4', name: 'grey77'},
				{hex: '#C7C7C7', name: 'grey78'},
				{hex: '#C9C9C9', name: 'grey79'},
				{hex: '#CCCCCC', name: 'grey80'},
				{hex: '#CFCFCF', name: 'grey81'},
				{hex: '#D1D1D1', name: 'grey82'},
				{hex: '#D4D4D4', name: 'grey83'},
				{hex: '#D6D6D6', name: 'grey84'},
				{hex: '#D9D9D9', name: 'grey85'},
				{hex: '#DBDBDB', name: 'grey86'},
				{hex: '#DEDEDE', name: 'grey87'},
				{hex: '#E0E0E0', name: 'grey88'},
				{hex: '#E3E3E3', name: 'grey89'},
				{hex: '#E5E5E5', name: 'grey90'},
				{hex: '#E8E8E8', name: 'grey91'},
				{hex: '#EBEBEB', name: 'grey92'},
				{hex: '#EDEDED', name: 'grey93'},
				{hex: '#F0F0F0', name: 'grey94'},
				{hex: '#F2F2F2', name: 'grey95'},
				{hex: '#F5F5F5', name: 'grey96'},
				{hex: '#F7F7F7', name: 'grey97'},
				{hex: '#FAFAFA', name: 'grey98'},
				{hex: '#FCFCFC', name: 'grey99'},
				{hex: '#FFFFFF', name: 'grey100'},
				{hex: '#F0FFF0', name: 'honeydew'},
				{hex: '#F0FFF0', name: 'honeydew1'},
				{hex: '#E0EEE0', name: 'honeydew2'},
				{hex: '#C1CDC1', name: 'honeydew3'},
				{hex: '#838B83', name: 'honeydew4'},
				{hex: '#FF69B4', name: 'HotPink'},
				{hex: '#FF6EB4', name: 'HotPink1'},
				{hex: '#EE6AA7', name: 'HotPink2'},
				{hex: '#CD6090', name: 'HotPink3'},
				{hex: '#8B3A62', name: 'HotPink4'},
				{hex: '#CD5C5C', name: 'IndianRed'},
				{hex: '#FF6A6A', name: 'IndianRed1'},
				{hex: '#EE6363', name: 'IndianRed2'},
				{hex: '#CD5555', name: 'IndianRed3'},
				{hex: '#8B3A3A', name: 'IndianRed4'},
				{hex: '#4B0082', name: 'indigo'},
				{hex: '#FFFFF0', name: 'ivory'},
				{hex: '#FFFFF0', name: 'ivory1'},
				{hex: '#EEEEE0', name: 'ivory2'},
				{hex: '#CDCDC1', name: 'ivory3'},
				{hex: '#8B8B83', name: 'ivory4'},
				{hex: '#F0E68C', name: 'khaki'},
				{hex: '#FFF68F', name: 'khaki1'},
				{hex: '#EEE685', name: 'khaki2'},
				{hex: '#CDC673', name: 'khaki3'},
				{hex: '#8B864E', name: 'khaki4'},
				{hex: '#E6E6FA', name: 'lavender'},
				{hex: '#FFF0F5', name: 'LavenderBlush'},
				{hex: '#FFF0F5', name: 'LavenderBlush1'},
				{hex: '#EEE0E5', name: 'LavenderBlush2'},
				{hex: '#CDC1C5', name: 'LavenderBlush3'},
				{hex: '#8B8386', name: 'LavenderBlush4'},
				{hex: '#7CFC00', name: 'LawnGreen'},
				{hex: '#FFFACD', name: 'LemonChiffon'},
				{hex: '#FFFACD', name: 'LemonChiffon1'},
				{hex: '#EEE9BF', name: 'LemonChiffon2'},
				{hex: '#CDC9A5', name: 'LemonChiffon3'},
				{hex: '#8B8970', name: 'LemonChiffon4'},
				{hex: '#ADD8E6', name: 'LightBlue'},
				{hex: '#BFEFFF', name: 'LightBlue1'},
				{hex: '#B2DFEE', name: 'LightBlue2'},
				{hex: '#9AC0CD', name: 'LightBlue3'},
				{hex: '#68838B', name: 'LightBlue4'},
				{hex: '#F08080', name: 'LightCoral'},
				{hex: '#E0FFFF', name: 'LightCyan'},
				{hex: '#E0FFFF', name: 'LightCyan1'},
				{hex: '#D1EEEE', name: 'LightCyan2'},
				{hex: '#B4CDCD', name: 'LightCyan3'},
				{hex: '#7A8B8B', name: 'LightCyan4'},
				{hex: '#EEDD82', name: 'LightGoldenrod'},
				{hex: '#FFEC8B', name: 'LightGoldenrod1'},
				{hex: '#EEDC82', name: 'LightGoldenrod2'},
				{hex: '#CDBE70', name: 'LightGoldenrod3'},
				{hex: '#8B814C', name: 'LightGoldenrod4'},
				{hex: '#FAFAD2', name: 'LightGoldenrodYellow'},
				{hex: '#D3D3D3', name: 'LightGray'},
				{hex: '#90EE90', name: 'LightGreen'},
				{hex: '#D3D3D3', name: 'LightGrey'},
				{hex: '#FFB6C1', name: 'LightPink'},
				{hex: '#FFAEB9', name: 'LightPink1'},
				{hex: '#EEA2AD', name: 'LightPink2'},
				{hex: '#CD8C95', name: 'LightPink3'},
				{hex: '#8B5F65', name: 'LightPink4'},
				{hex: '#FFA07A', name: 'LightSalmon'},
				{hex: '#FFA07A', name: 'LightSalmon1'},
				{hex: '#EE9572', name: 'LightSalmon2'},
				{hex: '#CD8162', name: 'LightSalmon3'},
				{hex: '#8B5742', name: 'LightSalmon4'},
				{hex: '#20B2AA', name: 'LightSeaGreen'},
				{hex: '#87CEFA', name: 'LightSkyBlue'},
				{hex: '#B0E2FF', name: 'LightSkyBlue1'},
				{hex: '#A4D3EE', name: 'LightSkyBlue2'},
				{hex: '#8DB6CD', name: 'LightSkyBlue3'},
				{hex: '#607B8B', name: 'LightSkyBlue4'},
				{hex: '#8470FF', name: 'LightSlateBlue'},
				{hex: '#778899', name: 'LightSlateGray'},
				{hex: '#778899', name: 'LightSlateGrey'},
				{hex: '#B0C4DE', name: 'LightSteelBlue'},
				{hex: '#CAE1FF', name: 'LightSteelBlue1'},
				{hex: '#BCD2EE', name: 'LightSteelBlue2'},
				{hex: '#A2B5CD', name: 'LightSteelBlue3'},
				{hex: '#6E7B8B', name: 'LightSteelBlue4'},
				{hex: '#FFFFE0', name: 'LightYellow'},
				{hex: '#FFFFE0', name: 'LightYellow1'},
				{hex: '#EEEED1', name: 'LightYellow2'},
				{hex: '#CDCDB4', name: 'LightYellow3'},
				{hex: '#8B8B7A', name: 'LightYellow4'},
				{hex: '#00FF00', name: 'lime'},
				{hex: '#32CD32', name: 'LimeGreen'},
				{hex: '#FAF0E6', name: 'linen'},
				{hex: '#FF00FF', name: 'magenta'},
				{hex: '#FF00FF', name: 'magenta1'},
				{hex: '#EE00EE', name: 'magenta2'},
				{hex: '#CD00CD', name: 'magenta3'},
				{hex: '#8B008B', name: 'magenta4'},
				{hex: '#B03060', name: 'maroon'},
				{hex: '#FF34B3', name: 'maroon1'},
				{hex: '#EE30A7', name: 'maroon2'},
				{hex: '#CD2990', name: 'maroon3'},
				{hex: '#8B1C62', name: 'maroon4'},
				{hex: '#66CDAA', name: 'MediumAquamarine'},
				{hex: '#0000CD', name: 'MediumBlue'},
				{hex: '#BA55D3', name: 'MediumOrchid'},
				{hex: '#E066FF', name: 'MediumOrchid1'},
				{hex: '#D15FEE', name: 'MediumOrchid2'},
				{hex: '#B452CD', name: 'MediumOrchid3'},
				{hex: '#7A378B', name: 'MediumOrchid4'},
				{hex: '#9370DB', name: 'MediumPurple'},
				{hex: '#AB82FF', name: 'MediumPurple1'},
				{hex: '#9F79EE', name: 'MediumPurple2'},
				{hex: '#8968CD', name: 'MediumPurple3'},
				{hex: '#5D478B', name: 'MediumPurple4'},
				{hex: '#3CB371', name: 'MediumSeaGreen'},
				{hex: '#7B68EE', name: 'MediumSlateBlue'},
				{hex: '#00FA9A', name: 'MediumSpringGreen'},
				{hex: '#48D1CC', name: 'MediumTurquoise'},
				{hex: '#C71585', name: 'MediumVioletRed'},
				{hex: '#191970', name: 'midnight blue'},
				{hex: '#191970', name: 'MidnightBlue'},
				{hex: '#F5FFFA', name: 'MintCream'},
				{hex: '#FFE4E1', name: 'misty rose'},
				{hex: '#FFE4E1', name: 'MistyRose'},
				{hex: '#FFE4E1', name: 'MistyRose1'},
				{hex: '#EED5D2', name: 'MistyRose2'},
				{hex: '#CDB7B5', name: 'MistyRose3'},
				{hex: '#8B7D7B', name: 'MistyRose4'},
				{hex: '#FFE4B5', name: 'moccasin'},
				{hex: '#FFDEAD', name: 'NavajoWhite'},
				{hex: '#FFDEAD', name: 'NavajoWhite1'},
				{hex: '#EECFA1', name: 'NavajoWhite2'},
				{hex: '#CDB38B', name: 'NavajoWhite3'},
				{hex: '#8B795E', name: 'NavajoWhite4'},
				{hex: '#000080', name: 'navy'},
				{hex: '#000080', name: 'NavyBlue'},
				{hex: '#FDF5E6', name: 'OldLace'},
				{hex: '#808000', name: 'olive'},
				{hex: '#6B8E23', name: 'OliveDrab'},
				{hex: '#C0FF3E', name: 'OliveDrab1'},
				{hex: '#B3EE3A', name: 'OliveDrab2'},
				{hex: '#9ACD32', name: 'OliveDrab3'},
				{hex: '#698B22', name: 'OliveDrab4'},
				{hex: '#FFA500', name: 'orange'},
				{hex: '#FFA500', name: 'orange1'},
				{hex: '#EE9A00', name: 'orange2'},
				{hex: '#CD8500', name: 'orange3'},
				{hex: '#8B5A00', name: 'orange4'},
				{hex: '#FF4500', name: 'OrangeRed'},
				{hex: '#FF4500', name: 'OrangeRed1'},
				{hex: '#EE4000', name: 'OrangeRed2'},
				{hex: '#CD3700', name: 'OrangeRed3'},
				{hex: '#8B2500', name: 'OrangeRed4'},
				{hex: '#DA70D6', name: 'orchid'},
				{hex: '#FF83FA', name: 'orchid1'},
				{hex: '#EE7AE9', name: 'orchid2'},
				{hex: '#CD69C9', name: 'orchid3'},
				{hex: '#8B4789', name: 'orchid4'},
				{hex: '#EEE8AA', name: 'PaleGoldenrod'},
				{hex: '#98FB98', name: 'PaleGreen'},
				{hex: '#9AFF9A', name: 'PaleGreen1'},
				{hex: '#90EE90', name: 'PaleGreen2'},
				{hex: '#7CCD7C', name: 'PaleGreen3'},
				{hex: '#548B54', name: 'PaleGreen4'},
				{hex: '#AFEEEE', name: 'PaleTurquoise'},
				{hex: '#BBFFFF', name: 'PaleTurquoise1'},
				{hex: '#AEEEEE', name: 'PaleTurquoise2'},
				{hex: '#96CDCD', name: 'PaleTurquoise3'},
				{hex: '#668B8B', name: 'PaleTurquoise4'},
				{hex: '#DB7093', name: 'PaleVioletRed'},
				{hex: '#FF82AB', name: 'PaleVioletRed1'},
				{hex: '#EE799F', name: 'PaleVioletRed2'},
				{hex: '#CD687F', name: 'PaleVioletRed3'},
				{hex: '#8B475D', name: 'PaleVioletRed4'},
				{hex: '#FFEFD5', name: 'papaya whip'},
				{hex: '#FFEFD5', name: 'PapayaWhip'},
				{hex: '#FFDAB9', name: 'peach puff'},
				{hex: '#FFDAB9', name: 'PeachPuff'},
				{hex: '#FFDAB9', name: 'PeachPuff1'},
				{hex: '#EECBAD', name: 'PeachPuff2'},
				{hex: '#CDAF95', name: 'PeachPuff3'},
				{hex: '#8B7765', name: 'PeachPuff4'},
				{hex: '#CD853F', name: 'peru'},
				{hex: '#FFC0CB', name: 'pink'},
				{hex: '#FFB5C5', name: 'pink1'},
				{hex: '#EEA9B8', name: 'pink2'},
				{hex: '#CD919E', name: 'pink3'},
				{hex: '#8B636C', name: 'pink4'},
				{hex: '#DDA0DD', name: 'plum'},
				{hex: '#FFBBFF', name: 'plum1'},
				{hex: '#EEAEEE', name: 'plum2'},
				{hex: '#CD96CD', name: 'plum3'},
				{hex: '#8B668B', name: 'plum4'},
				{hex: '#B0E0E6', name: 'PowderBlue'},
				{hex: '#A020F0', name: 'purple'},
				{hex: '#9B30FF', name: 'purple1'},
				{hex: '#912CEE', name: 'purple2'},
				{hex: '#7D26CD', name: 'purple3'},
				{hex: '#551A8B', name: 'purple4'},
				{hex: '#FF0000', name: 'red'},
				{hex: '#FF0000', name: 'red1'},
				{hex: '#EE0000', name: 'red2'},
				{hex: '#CD0000', name: 'red3'},
				{hex: '#8B0000', name: 'red4'},
				{hex: '#BC8F8F', name: 'RosyBrown'},
				{hex: '#FFC1C1', name: 'RosyBrown1'},
				{hex: '#EEB4B4', name: 'RosyBrown2'},
				{hex: '#CD9B9B', name: 'RosyBrown3'},
				{hex: '#8B6969', name: 'RosyBrown4'},
				{hex: '#4169E1', name: 'RoyalBlue'},
				{hex: '#4876FF', name: 'RoyalBlue1'},
				{hex: '#436EEE', name: 'RoyalBlue2'},
				{hex: '#3A5FCD', name: 'RoyalBlue3'},
				{hex: '#27408B', name: 'RoyalBlue4'},
				{hex: '#8B4513', name: 'SaddleBrown'},
				{hex: '#FA8072', name: 'salmon'},
				{hex: '#FF8C69', name: 'salmon1'},
				{hex: '#EE8262', name: 'salmon2'},
				{hex: '#CD7054', name: 'salmon3'},
				{hex: '#8B4C39', name: 'salmon4'},
				{hex: '#F4A460', name: 'SandyBrown'},
				{hex: '#2E8B57', name: 'SeaGreen'},
				{hex: '#54FF9F', name: 'SeaGreen1'},
				{hex: '#4EEE94', name: 'SeaGreen2'},
				{hex: '#43CD80', name: 'SeaGreen3'},
				{hex: '#2E8B57', name: 'SeaGreen4'},
				{hex: '#FFF5EE', name: 'seashell'},
				{hex: '#FFF5EE', name: 'seashell1'},
				{hex: '#EEE5DE', name: 'seashell2'},
				{hex: '#CDC5BF', name: 'seashell3'},
				{hex: '#8B8682', name: 'seashell4'},
				{hex: '#A0522D', name: 'sienna'},
				{hex: '#FF8247', name: 'sienna1'},
				{hex: '#EE7942', name: 'sienna2'},
				{hex: '#CD6839', name: 'sienna3'},
				{hex: '#8B4726', name: 'sienna4'},
				{hex: '#C0C0C0', name: 'silver'},
				{hex: '#87CEEB', name: 'SkyBlue'},
				{hex: '#87CEFF', name: 'SkyBlue1'},
				{hex: '#7EC0EE', name: 'SkyBlue2'},
				{hex: '#6CA6CD', name: 'SkyBlue3'},
				{hex: '#4A708B', name: 'SkyBlue4'},
				{hex: '#6A5ACD', name: 'SlateBlue'},
				{hex: '#836FFF', name: 'SlateBlue1'},
				{hex: '#7A67EE', name: 'SlateBlue2'},
				{hex: '#6959CD', name: 'SlateBlue3'},
				{hex: '#473C8B', name: 'SlateBlue4'},
				{hex: '#708090', name: 'SlateGray'},
				{hex: '#C6E2FF', name: 'SlateGray1'},
				{hex: '#B9D3EE', name: 'SlateGray2'},
				{hex: '#9FB6CD', name: 'SlateGray3'},
				{hex: '#6C7B8B', name: 'SlateGray4'},
				{hex: '#708090', name: 'SlateGrey'},
				{hex: '#FFFAFA', name: 'snow'},
				{hex: '#FFFAFA', name: 'snow1'},
				{hex: '#EEE9E9', name: 'snow2'},
				{hex: '#CDC9C9', name: 'snow3'},
				{hex: '#8B8989', name: 'snow4'},
				{hex: '#00FF7F', name: 'SpringGreen'},
				{hex: '#00FF7F', name: 'SpringGreen1'},
				{hex: '#00EE76', name: 'SpringGreen2'},
				{hex: '#00CD66', name: 'SpringGreen3'},
				{hex: '#008B45', name: 'SpringGreen4'},
				{hex: '#4682B4', name: 'SteelBlue'},
				{hex: '#63B8FF', name: 'SteelBlue1'},
				{hex: '#5CACEE', name: 'SteelBlue2'},
				{hex: '#4F94CD', name: 'SteelBlue3'},
				{hex: '#36648B', name: 'SteelBlue4'},
				{hex: '#D2B48C', name: 'tan'},
				{hex: '#FFA54F', name: 'tan1'},
				{hex: '#EE9A49', name: 'tan2'},
				{hex: '#CD853F', name: 'tan3'},
				{hex: '#8B5A2B', name: 'tan4'},
				{hex: '#008080', name: 'teal'},
				{hex: '#D8BFD8', name: 'thistle'},
				{hex: '#FFE1FF', name: 'thistle1'},
				{hex: '#EED2EE', name: 'thistle2'},
				{hex: '#CDB5CD', name: 'thistle3'},
				{hex: '#8B7B8B', name: 'thistle4'},
				{hex: '#FF6347', name: 'tomato'},
				{hex: '#FF6347', name: 'tomato1'},
				{hex: '#EE5C42', name: 'tomato2'},
				{hex: '#CD4F39', name: 'tomato3'},
				{hex: '#8B3626', name: 'tomato4'},
				{hex: '#40E0D0', name: 'turquoise'},
				{hex: '#00F5FF', name: 'turquoise1'},
				{hex: '#00E5EE', name: 'turquoise2'},
				{hex: '#00C5CD', name: 'turquoise3'},
				{hex: '#00868B', name: 'turquoise4'},
				{hex: '#EE82EE', name: 'violet'},
				{hex: '#D02090', name: 'VioletRed'},
				{hex: '#FF3E96', name: 'VioletRed1'},
				{hex: '#EE3A8C', name: 'VioletRed2'},
				{hex: '#CD3278', name: 'VioletRed3'},
				{hex: '#8B2252', name: 'VioletRed4'},
				{hex: '#F5DEB3', name: 'wheat'},
				{hex: '#FFE7BA', name: 'wheat1'},
				{hex: '#EED8AE', name: 'wheat2'},
				{hex: '#CDBA96', name: 'wheat3'},
				{hex: '#8B7E66', name: 'wheat4'},
				{hex: '#FFFFFF', name: 'white'},
				{hex: '#F5F5F5', name: 'WhiteSmoke'},
				{hex: '#FFFF00', name: 'yellow'},
				{hex: '#9ACD32', name: 'yellow green'},
				{hex: '#FFFF00', name: 'yellow1'},
				{hex: '#EEEE00', name: 'yellow2'},
				{hex: '#CDCD00', name: 'yellow3'},
				{hex: '#8B8B00', name: 'yellow4'},
				{hex: '#9ACD32', name: 'YellowGreen'}
		];
	
		//Here is the color picker code
		new Vue({
			el: '#color-picker',
			data: {
				active: false,
				selectedColor: '#F0F8FF',
				selectedColorName: 'AliceBlue',
				colors: colors
			},
			computed: {
				selector: function() {
					if(!this.selectedColor) {
						return 'Color';
					}
					else {
						color = this.selectedColor
						return '<span style="background: ' + this.selectedColor + '"></span> ' + this.selectedColorName;
					}
				}
			},
			methods: {
				setColor: function(color, colorName) {
					this.selectedColor = color;
					this.selectedColorName = colorName;
					this.active = false;
				},
				toggleDropdown: function() {
					this.active = !this.active;
				},
			}
		});
		
		function screenToOriginalState()
		{
			//Depending on which tool is chosen, the fields in the sidebar on the left are hidden or shown.  On load, just hide the ones we don't need
			document.getElementById("functionField").style.display = "none";
			document.getElementById("itemsField").style.display = "none";
			document.getElementById("buttonsField").style.display = "none";
			document.getElementById("checkField").style.display = "none";
			document.getElementById("varField").style.display = "none";
			document.getElementById("fontField").style.display = "none";
			document.getElementById("progressBarField").style.display = "none";
			document.getElementById("comboBoxField").style.display = "none";
			document.getElementById("spinBoxField").style.display = "none";
			document.getElementById("pictureField").style.display = "none";
			document.getElementById("full_code").style.display = "none";
			document.getElementById("UIcolumn").style.opacity = "0.5";
		}
		
		//We initialize the page, make the canvas, etc...
		function init () 
		{ 
			canvaso = document.getElementById('drawingCanvas'); 
			if (!canvaso) 
			{ 
				alert('Error! The canvas element was not found!'); 
				return; 
			} 
			if (!canvaso.getContext) 
			{ 
				alert('Error! No canvas.getContext!'); 
				return; 
			} 
			// Create 2d canvas. 
			contexto = canvaso.getContext('2d'); 
			if (!contexto) 
			{ 
				alert('Error! Failed to getContext!'); 
				return; 
			} 
			// Build the temporary canvas. 
			var container = canvaso.parentNode; 
			canvas = document.createElement('canvas'); 
			if (!canvas) 
			{ 
				alert('Error! Cannot create a new canvas element!'); 
				return; 
			} 
			canvas.id     = 'tempCanvas'; 
			canvas.width  = canvaso.width; 
			canvas.height = canvaso.height; 
			container.appendChild(canvas); 
			context = canvas.getContext('2d'); 
			context.strokeStyle = "#FFFFFF";// Default line color. 
			context.lineWidth = 1.0;// Default stroke weight. 

			context.clearRect(0, 0, canvas.width, canvas.height);
			
			//An event listener for the set values button
			var valuesButton = document.getElementById('setVals')
			valuesButton.addEventListener('click', setVals, false); 
			
			//An event listener for the button which sets the number of list box items
			var numberOfListBoxItemsValue = document.getElementById('numberOfListBoxItemsButton')
			numberOfListBoxItemsValue.addEventListener('click', makeListBoxEntryField, false);
			
			//An event listener for the button which sets the number of combo box items
			var numberOfComboBoxItemsValue = document.getElementById('numberOfComboBoxItemsButton')
			numberOfComboBoxItemsValue.addEventListener('click', makeComboBoxEntryField, false);			
			
			//An event listener for the button which sets the number of radio buttons
			var numberOfRadioButtonsValue = document.getElementById('numberOfRadioButtonsButton')
			numberOfRadioButtonsValue.addEventListener('click', makeRadioButtonsEntryField, false);
			
			//An event listener for the button used to redraw the canvas after an object is deleted
			var deleteAndRedrawButton = document.getElementById('deleteAndRedraw')
			deleteAndRedrawButton.addEventListener('click', deleteObjects, false);
			
			//An event listener for text boxes which need to have spaces and punctuation filtered
			var wFilterCandidates = document.getElementsByClassName('wFilter')
			for (var i = 0; i < wFilterCandidates.length; i++)
			{
				wFilterCandidates[i].addEventListener('input', checkChars, false);
			}			
			
			//Add event listeners to all required fields (required fields have the class 'wFilter', 'noQuotes', 'justNums' and 'required'
			var wfc = document.getElementsByClassName('wFilter')
			for (var i = 0; i < wfc.length; i++)
			{
				wfc[i].addEventListener('change', areAllFieldsFull, false);
			}
			var nqc = document.getElementsByClassName('noQuotes')
			for (var i = 0; i < nqc.length; i++)
			{
				nqc[i].addEventListener('change', areAllFieldsFull, false);
			}
			var jnc = document.getElementsByClassName('justNums')
			for (var i = 0; i < jnc.length; i++)
			{
				jnc[i].addEventListener('change', areAllFieldsFull, false);
			}		
			var rc = document.getElementsByClassName('required')
			for (var i = 0; i < rc.length; i++)
			{
				rc[i].addEventListener('change', areAllFieldsFull, false);
			}
			
			
			//An event listener for number boxes which can only have numbers in them
			var justNumsCandidates = document.getElementsByClassName('justNums')
			for (var i = 0; i < justNumsCandidates.length; i++)
			{
				justNumsCandidates[i].addEventListener('change', checkNums, false);
			}			
			
			//An event listener which listens for the select all button by the python code box
			var selectAllButton = document.getElementById('selectAll')
			selectAllButton.addEventListener('click', selectAllAndCopy, false);		
			
			//An event listener which checks if the "Use a grid" option is checked or unchecked, and alters the gridSize variable accordingly
			var gridChecked = document.getElementById('useAGrid')
			gridChecked.addEventListener('change', gridCheckChanged, false);
			
			document.getElementById("textForButtonOrLabel").value = "Hello, I'm the main window";
			
			// Create a select field with our tools. 
			var tool_select = document.getElementById('selector'); 
			if (!tool_select) 
			{ 
				alert('Error! Failed to get the select element!'); 
				return; 
			} 
			tool_select.addEventListener('change', ev_tool_change, false); 
  
			// Activate the default tool (mainWindow). 
			if (tools[tool_default]) 
			{ 
				tool = new tools[tool_default](); 
				tooltype = document.getElementById("selector").options[document.getElementById("selector").selectedIndex].id;
				tool_select.value = tool_default; 
			} 
			
			// Event Listeners. 
			canvas.addEventListener('mousedown', ev_canvas, false); 
			canvas.addEventListener('mousemove', ev_canvas, false); 
			canvas.addEventListener('mouseup',   ev_canvas, false); 
		}
		
		// Get the mouse position. 
		function ev_canvas (ev) 
		{ 
			if (ev.layerX || ev.layerX == 0)  // Firefox 
			{ 
				ev._x = ev.layerX; 
				ev._y = ev.layerY; 
			} else if (ev.offsetX || ev.offsetX == 0)  // Opera 
			{ 
				ev._x = ev.offsetX; 
				ev._y = ev.offsetY; 
			} 
			// Get the tool's event handler. 
			var func = tool[ev.type]; 
			if (func) 
			{ 
				func(ev); 
			} 
		} 
		
		//Show and hide the appropriate entry fields in the left sidebar, depending on the tool chosen
		function ev_tool_change (ev) 
		{ 
			if (tools[this.value]) 
			{ 
				tool = new tools[this.value](); 
				tooltype = document.getElementById("selector").options[document.getElementById("selector").selectedIndex].id;
			} 
			if (tooltype == "mainWindow")
			{
				ShowNHide("block", "block", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none")
				document.getElementById("textForButtonOrLabel").value = "Hello, I'm the main window";
			}
			if (tooltype == "textInput")
			{
				ShowNHide("none", "none", "none", "none", "none", "none", "block", "none", "none", "none", "none", "none")
				document.getElementById("textInputName").value = "tInput";
			}
			if (tooltype == "button")
			{
				ShowNHide("block", "block", "block", "none", "none", "none", "none", "block", "none", "none", "none", "none");
				document.getElementById("textForButtonOrLabel").value = "Button text!";
				document.getElementById("function").value = "btnClickFunction";
			}
			if (tooltype == "label")
			{
				ShowNHide("none", "block", "none", "none", "none", "none", "none", "block", "none", "none", "none", "none");
				document.getElementById("textForButtonOrLabel").value = "this is a label";
			}
			if (tooltype == "listBox")
			{
				ShowNHide("block", "none", "none", "block", "none", "none", "none", "block", "none", "none", "none", "none");
				document.getElementById("listBoxName").value = "listBoxOne";
				document.getElementById("numberOfListBoxItems").value = "0";
			}
			if (tooltype == "radioButtons")
			{
				ShowNHide("block", "none", "none", "none", "block", "none", "none", "block", "none", "none", "none", "none");
				document.getElementById("buttonGroupName").value = "rbGroupOne";
				document.getElementById("buttonVar").value = "rbVariable";
				document.getElementById("numberOfRadioButtons").value = "0";
				
			}
			if (tooltype == "checkBox")
			{
				ShowNHide("block", "none", "none", "none", "none", "block", "none", "block", "none", "none", "none", "none");
				document.getElementById("checkBoxName").value = "CheckBoxOne";
				document.getElementById("checkBoxVar").value = "cbVariable";
				document.getElementById("checkBoxText").value = "Check me, I'm a box!";
			}
			if (tooltype == "progressBar")
			{
				ShowNHide("block", "none", "none", "none", "none", "none", "none", "none", "block", "none", "none", "none");
				document.getElementById("progressBarName").value = "progessBarOne";
			}
			if (tooltype == "comboBox")
			{
				ShowNHide("none", "none", "none", "none", "none", "none", "none", "block", "none", "block", "none", "none");
				document.getElementById("comboBoxName").value = "comboOneTwoPunch";
				document.getElementById("numberOfComboBoxItems").value = "0";
				document.getElementById("comboBoxWidth").value = "10";
			}				
			if (tooltype == "spinBox")
			{
				ShowNHide("block", "none", "none", "none", "none", "none", "none", "block", "none", "none", "block", "none");
				document.getElementById("spinBoxName").value = "spinBoxOne";
				document.getElementById("sbMinValue").value = "1";
				document.getElementById("sbMaxValue").value = "50";
				document.getElementById("spinBoxWidth").value = "10";
			}			
			if (tooltype == "picture")
			{
				ShowNHide("none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "block");
				document.getElementById("pictureName").value = "worthAThousandWords";
			}
		} 
		
		//This shows or hides the input fields
		function ShowNHide(c, t, f, i, b, cb, v, fo, pb, cbb, sb, p)
		{
			document.getElementById("colorField").style.display = c;
			document.getElementById("textField").style.display = t;
			document.getElementById("functionField").style.display = f;
			document.getElementById("itemsField").style.display = i;
			document.getElementById("buttonsField").style.display = b;
			document.getElementById("checkField").style.display = cb;
			document.getElementById("varField").style.display = v;
			document.getElementById("fontField").style.display = fo;
			document.getElementById("progressBarField").style.display = pb;
			document.getElementById("comboBoxField").style.display = cbb;
			document.getElementById("spinBoxField").style.display = sb;
			document.getElementById("pictureField").style.display = p;
		}
		
		//This is a function linked to an event listener created above.  It tells the computer that the values have been set via a boolean, and un-greys the UI drawing window
		function setVals()
		{
			
			var name = ""
			
			if (tooltype == "textInput") { name = document.getElementById('textInputName').value } else
			if (tooltype == "button") { name = document.getElementById('textForButtonOrLabel').value } else
			if (tooltype == "label") { name = document.getElementById('textForButtonOrLabel').value } else
			if (tooltype == "listBox") { name = document.getElementById('listBoxName').value } else
			if (tooltype == "radioButtons") { name = document.getElementById('buttonGroupName').value } else
			if (tooltype == "checkBox") { name = document.getElementById('checkBoxName').value } else
			if (tooltype == "progressBar") { name = document.getElementById('progressBarName').value } else
			if (tooltype == "comboBox") { name = document.getElementById('comboBoxName').value } else
			if (tooltype == "spinBox") { name = document.getElementById('spinBoxName').value } else
			if (tooltype == "picture") { name = document.getElementById('pictureName').value }
			
			if (inArray(name, usedNames) == true)
			{
				alert("You have already created a widget with the name " + name + ". Please choose another name.");
			}
			else
			{				
				valuesSet = true;
				document.getElementById("UIcolumn").style.opacity = "1";
			}
		}
		
		
		//This function checks if a value is in a given array
		function inArray(needle, haystack)
		{
			for (var poh=0; poh < haystack.length; poh++)
			{
				if (haystack[poh] == needle)
				{
					return true;
				}
			}
			return false;
		}
		
		
		//This function checks the input values of all required fields.  If any one of them is missing, it makes the "Use these values" button disappear
		function areAllFieldsFull()
		{
			
			var wfc = document.getElementsByClassName('wFilter')
			for (var i = 0; i < wfc.length; i++)
			{
				if ((wfc[i].value.length == 0) && (wfc[i].offsetWidth > 0))
				{
					somethingMissing = true;
				}
			}			
			var nqc = document.getElementsByClassName('noQuotes')
			for (var i = 0; i < nqc.length; i++)
			{
				if ((nqc[i].value.length == 0) && (nqc[i].offsetWidth > 0))
				{
					somethingMissing = true;
				}
			}
			var jnc = document.getElementsByClassName('justNums')
			for (var i = 0; i < jnc.length; i++)
			{
				if ((jnc[i].value.length == 0) && (jnc[i].offsetWidth > 0))
				{
					somethingMissing = true;
				}
			}		
			var rc = document.getElementsByClassName('required')
			for (var i = 0; i < rc.length; i++)
			{
				if ((rc[i].value.length == 0) && (rc[i].offsetWidth > 0))
				{
					somethingMissing = true;
				}
			}
			if (somethingMissing == true)
			{
				document.getElementById('setVals').disabled = true;
			}
			else
			{
				document.getElementById('setVals').disabled = false;
			}		
			somethingMissing = false;			
		}

		//Depending on the number of list box items a user wants to create, this function dynamically creates entry fields for those list box item names
		function makeListBoxEntryField()
		{
			
			var howMany = document.getElementById("numberOfListBoxItems").value;
			var holder = document.createElement("div");
			holder.setAttribute('type', 'toolComponent');
			
			var label = document.createTextNode("Here are your listbox item entry fields:");
			holder.appendChild(label)
			for (var i = 0; i < howMany; i++)
			{
				var thisItemName = "listBox" + String(i);
				var inp = document.createElement("input"); 
				inp.setAttribute('type',"items_text");
				inp.setAttribute('id', thisItemName);
				inp.setAttribute('value', listBoxGibberish[Math.floor(Math.random() * 130)]);
				inp.setAttribute('class', 'required');
				inp.addEventListener('change', areAllFieldsFull, false);
				holder.appendChild(inp)
				var br = document.createTextNode("  ");
				holder.appendChild(br)
				document.getElementById("listBoxItems").appendChild(holder)
			}
		}
		
		//Same as above, but for combo box items
		function makeComboBoxEntryField()
		{		
			
			var howMany = document.getElementById("numberOfComboBoxItems").value;
			var holder = document.createElement("div");
			holder.setAttribute('type', 'toolComponent');
			
			var label = document.createTextNode("Here are your combo box items:");
			holder.appendChild(label)
			for (var i = 0; i < howMany; i++)
			{
				var thisItemName = "comboBox" + String(i);
				var inp = document.createElement("input"); 
				inp.setAttribute('type',"items_text");
				inp.setAttribute('id', thisItemName);
				inp.setAttribute('value', listBoxGibberish[Math.floor(Math.random() * 130)]);
				inp.setAttribute('class', 'required');
				inp.addEventListener('change', areAllFieldsFull, false);
				holder.appendChild(inp)
				var br = document.createTextNode("  ");
				holder.appendChild(br)
				document.getElementById("comboBoxItems").appendChild(holder)
			}
		}			
		
		//Same as above, but for radio buttons
		function makeRadioButtonsEntryField()
		{
	
			var howMany = document.getElementById("numberOfRadioButtons").value;
			
			document.getElementById("buttonsField").style.display = "none";
			
			var holder = document.createElement("div");
			holder.setAttribute('type', 'toolComponent');
			var br = document.createElement("br");
			holder.appendChild(br);
			
			var label = document.createTextNode("Here are your radio box item entry fields:");
			holder.appendChild(label)
			var br = document.createElement("br");
			holder.appendChild(br)
			
			for (var i = 0; i < howMany; i++)
			{
				var thisItemName = "radioButton" + String(i);
				var inp = document.createElement("input"); 
				inp.setAttribute('type',"items_text");
				inp.setAttribute('id', thisItemName);
				inp.setAttribute('value', "Visible text");
				inp.setAttribute('class', 'required');
				inp.addEventListener('change', areAllFieldsFull, false);
				
				var thisItemValue = "radioButtonValue" + String(i);
				var inp2 = document.createElement("input");
				inp2.setAttribute('type',"items_text");
				inp2.setAttribute('id', thisItemValue);
				inp2.setAttribute('class', 'wFilter');
				inp2.setAttribute('value', "InvisibleValue");	
				inp2.setAttribute('class', 'required');
				inp2.addEventListener('input', checkChars, false);
				inp2.addEventListener('change', areAllFieldsFull, false);
				
				holder.appendChild(inp);
				var space = document.createTextNode("  ");
				holder.appendChild(space)
				holder.appendChild(inp2)
				var br = document.createElement("br");
				holder.appendChild(br)
			}
			document.getElementById("radioButtonItems").appendChild(holder);
		}
		

		// Create the temporary canvas on top of the canvas, which is cleared each time the user draws. 
		function img_update () 
		{ 
			contexto.drawImage(canvas, 0, 0); 
			context.clearRect(0, 0, canvas.width, canvas.height); 
		} 
		
		
		//After the canvas is re-drawn, this sends all the stuff on the main canvas to the backdrop canvas.  This eliminated a big problem, which was that deleted objects would still be visible after deletion.
		function send_to_back () 
		{ 
			contexto.drawImage(canvas, 0, 0); 
		} 
		
		
		var tools = {}; 
		var tooltypes = {};

		// Every tool is a rectangle tool, this is the function for all tools
		tools.rect = function () 
		{
			var tool = this; 
			this.started = false; 
			this.mousedown = function (ev) 
			{ 
				if (valuesSet == true)
				{
					tool.started = true; 
					tool.x0 = ev._x; 
					tool.y0 = ev._y; 
					//If the user is drawing a main window, save the color they have chosen (this will be used to re-draw the main window, also to set the background color of labels
					if (tooltype == "mainWindow")
					{
						mainWindowBackgroundColor = color;
					}
				}
			};
			
			this.mousemove = function (ev) 
			{ 
				if (!tool.started) 
				{ 
					return; 
				} 
				// This creates a rectangle on the canvas. 
				var x = Math.min(ev._x,  tool.x0), 
				y = Math.min(ev._y,  tool.y0), 
				w = Math.abs(ev._x - tool.x0), 
				h = Math.abs(ev._y - tool.y0);
					
				context.clearRect(0, 0, canvas.width, canvas.height);// Clears the rectangle onload. 
  
				if (!w || !h) 
				{ 
					return; 
				} 
				
				//Here, we adjust all the values coming in from the mouse movements so that they 
				//align with the grid (which is in increments of 10pixels if activated,
				//and in increments of 1 pixel if unactivated
				movingX = snapToGrid(ev._x),
				movingY = snapToGrid(ev._y)
				w = snapToGrid(Math.abs(snapToGrid(ev._x) - snapToGrid(tool.x0))), 
				h = snapToGrid(Math.abs(snapToGrid(ev._y) - snapToGrid(tool.y0)));
	
				//Depending on the tooltype, make different objects on the canvas
				if (tooltype == "mainWindow")
				{
					makeMainWindow(x, y, w, h)
					return [x, y, w, h];
				}
				else if (tooltype == "textInput")
				{		
					makeTextInput(movingX, movingY)
					return [movingX, movingY];
				}
				else if (tooltype == "button")
				{
					makeButton(movingX, movingY, document.getElementById("textForButtonOrLabel").value, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					return [movingX, movingY];
				}
				else if  (tooltype == "listBox")
				{						
					//in the case of a listbox, the height of the listbox varies depending on how many items are in it, and the width varies depending on how many characters the longest item includes.
					//Here, we get the number of items and length (in chars) of the longest item, so we can draw an appropriately-dimensioned list box.
					var howMany = document.getElementById("numberOfListBoxItems").value;
					var longestItem = "a";
					var items = new Array();
					
					for (var i = 0; i < howMany; i++)
					{
						var thisItemName = "listBox" + String(i);
						if (document.getElementById(thisItemName).value.length > longestItem.length)
						{
							longestItem = document.getElementById(thisItemName).value
						}
						items.push(document.getElementById(thisItemName).value);
					}
					
					makeListBox(movingX, movingY, howMany, longestItem, items, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					return [movingX, movingY];
				}
				else if (tooltype == "label")
				{				
					makeLabel(movingX, movingY, document.getElementById("textForButtonOrLabel").value, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					return [movingX, movingY];
				}
				else if (tooltype == "checkBox")
				{
					makeCheckBox(movingX, movingY, document.getElementById("checkBoxText").value, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333));					
					return [movingX, movingY];
				}
				else if (tooltype == "radioButtons")
				{
					//This is the same as the list box, above.  We need the number of items and length of longest item in order to draw an appropriately-dimensioned radio button group.
					var stringOfButtons = new Array();
					var longestItem = "a";
					var howMany = document.getElementById("numberOfRadioButtons").value;
					for (var i = 0; i < howMany; i++)
					{
						var thisItemName = "radioButton" + String(i);
						var thisButton = document.getElementById(thisItemName).value;
						if (thisButton == "") { break; }
						stringOfButtons.push(thisButton);
						if (thisButton.length > longestItem.length)
						{
							longestItem = thisButton
						}
					}
					var VorH = document.querySelector('input[name="HorV"]:checked').value
					
					makeRadioButtons(movingX, movingY, VorH, howMany, longestItem, stringOfButtons, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					return [movingX, movingY];
				}
				else if (tooltype == "progressBar")
				{
					makeProgressBar(x, y, w, color)
					return [x, y, w]
				}
				else if (tooltype == "comboBox")
				{
					
					//This is a little crazy. 
					//The user enters a width for the combo box in characters (as is the convention in tkinter)
					//However, to display properly in the web browser, we have to convert that character figure to a pixel figure, so...
					
					//first, set the font to the chosen one
					context.font = document.getElementById("chosenStyle").value + " " + document.getElementById("fontSize").value + "px " + document.getElementById("chosenFont").value;
					
					//then, multiply the character width entered by the user by the width of the current font (x 1.25 for some reason), plus 15 pixels for the icon that 
					//always appears on the right side of the combo box
					widthForBrowser = document.getElementById("comboBoxWidth").value * (context.measureText("A").width * 1.25) + 15
					
					//and THEN, we actually make the combo Box (in the browser window)
					makeComboBox(movingX, movingY, snapToGrid(widthForBrowser), document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					
					//finally, we assign the raw character width value to a variable called "widthForPython", which will be used in the actual building of the code
					widthForPython = document.getElementById("comboBoxWidth").value
					return [movingX, movingY, widthForPython, widthForBrowser];
				}
				else if (tooltype == "spinBox")
				{
					
					//This is the same craziness as above.
					///
					///
					context.font = document.getElementById("chosenStyle").value + " " + document.getElementById("fontSize").value + "px " + document.getElementById("chosenFont").value;
					widthForBrowser = document.getElementById("spinBoxWidth").value * (context.measureText("A").width * 1.25) + 15
					makeSpinBox(movingX, movingY, snapToGrid(widthForBrowser), color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333))
					
					widthForPython = document.getElementById("spinBoxWidth").value
					return [movingX, movingY, widthForPython, widthForBrowser];
				}
				else if (tooltype == "picture")
				{		
					var inputWidth = document.getElementById("pictureW").value;
					var inputHeight = document.getElementById("pictureH").value;
					makePicture(movingX, movingY, inputWidth, inputHeight)
					return [movingX, movingY, inputWidth, inputHeight];
				}
			}; 
			
			
			
			
			// When the user finishes drawing, and the mouse has been let up...
			this.mouseup = function (ev) 
			{ 
				if (tool.started) 
				{				
				    coords = tool.mousemove(ev); 
					
					//draw the icon at the top of the main window
					drawFIcon(iconX, iconY);
					
					
					//Depending on the tool, add various sub-arrays to the array "Objects To Make." 
					//If the user deletes an object and chooses to re-draw the window, the objects (with dimension information) stored in the "Objects To Make" array
					//will be remade by looping through the array and re-drawing each one, automatically
					//Also, with the reference to the "MakeObject" function, this section of the program also actually writes the python code for the object
					//into the code area on the right.
					
					if (tooltype == "mainWindow")
					{							
						//If it's a main window, make the header (add an icon and put in the text)
						makeMainWindowHeader(coords[0], coords[1], document.getElementById("textForButtonOrLabel").value)
						//and, remove the main window tool from the tool selector, as we won't be using it again.
						removeMainWindowTool();
						tooltype == "--";
						
						var theseObjects = [tooltype, coords[0], coords[1], coords[2], coords[3]]
						objectsToMake.push(theseObjects)
						
						var theseObjects2 = ["mainWindowHeader", coords[0], coords[1], document.getElementById("textForButtonOrLabel").value]
						objectsToMake.push(theseObjects2)
						MakeObject(coords, tooltype, "mainWindowDiv");
					}
					else if (tooltype == "textInput")
					{		
						var theseObjects = [tooltype, document.getElementById("textInputName").value, snapToGrid(coords[0]), snapToGrid(coords[1])]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("textInputName").value + "Div")
						usedNames.push(document.getElementById("textInputName").value);
					}
					else if (tooltype == "button")
					{
						var theseObjects = [tooltype, document.getElementById("textForButtonOrLabel").value, snapToGrid(ev._x), snapToGrid(ev._y), document.getElementById("textForButtonOrLabel").value, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("textForButtonOrLabel").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("textForButtonOrLabel").value);
					}
					else if  (tooltype == "listBox")
					{						
						var howMany = document.getElementById("numberOfListBoxItems").value;
						var longestItem = "a";
						var items = new Array();
						
						for (var i = 0; i < howMany; i++)
						{
							var thisItemName = "listBox" + String(i);
							if (document.getElementById(thisItemName).value.length > longestItem.length)
							{
								longestItem = document.getElementById(thisItemName).value
							}
							items.push(document.getElementById(thisItemName).value);
						}
						
						var theseObjects = [tooltype, document.getElementById("listBoxName").value, snapToGrid(ev._x), snapToGrid(ev._y), howMany, longestItem, items, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("listBoxName").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("listBoxName").value);
					}
					else if (tooltype == "label")
					{				
						var theseObjects = [tooltype, document.getElementById("textForButtonOrLabel").value, snapToGrid(ev._x), snapToGrid(ev._y), document.getElementById("textForButtonOrLabel").value, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("textForButtonOrLabel").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("textForButtonOrLabel").value);
					}
					else if (tooltype == "checkBox")
					{
						var theseObjects = [tooltype, document.getElementById("checkBoxName").value, snapToGrid(ev._x), snapToGrid(ev._y), document.getElementById("checkBoxText").value, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("checkBoxName").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("checkBoxName").value);
						
						//put the checkbox icon next to the text
						
						//this is the height of the box which forms the outer border of the checkbox
						var h = (context.measureText("A").width * 2) + 10
						//let's divide it in half to get the centerpoint (horizontally) of the box, then subtract 7 (which is half the height of the checkbox icon)
						//and put it into the array of x, y coordinates of checkbox icons
						// Actually, we put in --name--, --x--, --y--
						// Later, if the user chooses to delete this checkbox, the deleting function looks for the name, then deletes the associated x and y values
						checkBoxCoords.push(document.getElementById("checkBoxName").value);
						checkBoxCoords.push(snapToGrid(ev._x)+5);
						checkBoxCoords.push(snapToGrid(ev._y) + (h/2) - 7);
						
					}
					else if (tooltype == "radioButtons")
					{
						var stringOfButtons = new Array();
						var longestItem = "a";
						var howMany = document.getElementById("numberOfRadioButtons").value;
						for (var i = 0; i < howMany; i++)
						{
							var thisItemName = "radioButton" + String(i);
							var thisButton = document.getElementById(thisItemName).value;
							if (thisButton == "") { break; }
							stringOfButtons.push(thisButton);
							if (thisButton.length > longestItem.length)
							{
								longestItem = thisButton
							}
						}
						var VorH = document.querySelector('input[name="HorV"]:checked').value
						
						var theseObjects = [tooltype, document.getElementById("buttonGroupName").value, snapToGrid(ev._x), snapToGrid(ev._y), VorH, howMany, longestItem, stringOfButtons, color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("buttonGroupName").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("buttonGroupName").value);
						
						//put the radio button icons next to the text...........
						
						//we push the radio button group name into the array
						//then, in the loop below, we push in each x and y coordinate of the buttons
						//we will need the name information later, if the user decideds to delete the radio button group
						var coordGroup = new Array();
						coordGroup.push(document.getElementById("buttonGroupName").value);
						
						if (VorH == "left")
						{	
		
							//this is the height of the box which forms the outer border of the radio button group, when it's existing horizontally
							var h = (context.measureText("A").width * 2) + 10
							
							//let's divide it in half to get the centerpoint (horizontally) of the box, then subtract 7 (which is half the height of the radiobutton icon)
							var verticalPosition = snapToGrid(ev._y) + (h/2) - 7
							
							var horizontalPosition = snapToGrid(ev._x)+10
							for (var b = 0; b < stringOfButtons.length; b++)
							{
								coordGroup.push(horizontalPosition)
								coordGroup.push(verticalPosition)
								horizontalPosition += context.measureText(stringOfButtons[b]).width+30;
							}
						}
						else
						{							
							var verticalPosition = snapToGrid(ev._y) + (context.measureText("A").width); 
							for (var b = 0; b < stringOfButtons.length; b++)
							{ 
								coordGroup.push(snapToGrid(ev._x)+2)
								coordGroup.push(verticalPosition);
								verticalPosition += (context.measureText("A").width * 2) + 10
							}
						}
						
						//finally, we push this set of coords into the radioButtonCoords array
						radioButtonCoords.push(coordGroup);
					}
					else if (tooltype == "progressBar")
					{
						var theseObjects = [tooltype, document.getElementById("progressBarName").value, snapToGrid(coords[0]), snapToGrid(coords[1]), coords[2], color, document.getElementById("pbMaxValue").value, document.getElementById("pbIncrements").value]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("progressBarName").value + "Div");
						usedNames.push(document.getElementById("progressBarName").value);
					}
					else if (tooltype == "comboBox")
					{
						var theseObjects = [tooltype, document.getElementById("comboBoxName").value, snapToGrid(ev._x), snapToGrid(ev._y), coords[3], document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("comboBoxName").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)
						usedNames.push(document.getElementById("comboBoxName").value);
						
						//put the combobox icon next to the text
						
						//this is the height of the box which forms the outer border of the combobox
						var h = context.measureText("A").width + (context.measureText("A").width/2) + 6
						//let's divide it in half to get the centerpoint (horizontally) of the box, then subtract 12 (which is half the height of the combobox icon)
						//and put it into the array of x, y coordinates of combobox icons
						// Actually, we put in --name--, --x--, --y--
						// Later, if the user chooses to delete this checkbox, the deleting function looks for the name, then deletes the associated x and y values
						comboCoords.push(document.getElementById("comboBoxName").value);
						comboCoords.push((snapToGrid(ev._x) + coords[3])-17); // 17 is the width of the combobox icon
						comboCoords.push(snapToGrid(ev._y) + (h/2) - 12);
										
					}
					else if (tooltype == "spinBox")
					{
						var theseObjects = [tooltype, document.getElementById("spinBoxName").value, snapToGrid(ev._x), snapToGrid(ev._y), coords[3], color, document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, Math.ceil(parseInt(document.getElementById("fontSize").value)*1.3333)]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("spinBoxName").value + "Div", document.getElementById("chosenFont").value, document.getElementById("chosenStyle").value, document.getElementById("fontSize").value)	
						usedNames.push(document.getElementById("spinBoxName").value);
						
						//put the spinbox icon next to the text
						
						//this is the height of the box which forms the outer border of the spin box
						var h = context.measureText("A").width + (context.measureText("A").width/2) + 6
						//let's divide it in half to get the centerpoint (horizontally) of the box, then subtract 10 (which is half the height of the spinbox icon)
						//and put it into the array of x, y coordinates of spinbox icons
						// Actually, we put in --name--, --x--, --y--
						// Later, if the user chooses to delete this spinbox, the deleting function looks for the name, then deletes the associated x and y values
						spinCoords.push(document.getElementById("spinBoxName").value);
						spinCoords.push((snapToGrid(ev._x) + coords[3])-14); // 14 is the width of the spinbox icon
						spinCoords.push(snapToGrid(ev._y) + (h/2) - 10);
						
					}		
					else if (tooltype == "picture")
					{
						var theseObjects = [tooltype, document.getElementById("pictureName").value, snapToGrid(ev._x), snapToGrid(ev._y), document.getElementById("pictureW").value, document.getElementById("pictureH").value]
						objectsToMake.push(theseObjects)
						MakeObject(coords, tooltype, document.getElementById("pictureName").value + "Div")
						usedNames.push(document.getElementById("pictureName").value);
					}
					
					drawAllIcons();
								

					tool.started = false; 
					
					//update the image
					img_update(); 

					//The values are no longer set, so change the boolean to false,
					//also, grey-out the middle column again, as we aren't going to draw anymore
					valuesSet = false;
					
					screenToOriginalState();
					
					//Put the tool selector to blank, so the tool has to be chosen again
					var s = document.getElementById("selector");
					s.value = "---";

					//If there are more than 2 objects in the "Objects To Make" array, populate the objects list and make the button visible
					//(There will always be at least 2 objects in the array--the main window and main window header--so we don't count those)
					if (objectsToMake.length > 2)
					{
						populateObjectsList()
						document.getElementById("deleteAndRedraw").style.display = "block";
					}
					
				}
			}
		};
		
		
		
		//This function draws all checkbox, spinbox, combobox and radiobutton icons
		function drawAllIcons()
		{
			//draw the checkbox, radiobutton, spinbox and combobox icons, if there are any
			if (checkBoxCoords.length > 0)
			{
				for (var cbc = 2; cbc < checkBoxCoords.length; cbc = cbc + 3)
				{
					drawCIcon(checkBoxCoords[cbc-1], checkBoxCoords[cbc])
				}
			}
			if (radioButtonCoords.length > 0)
			{
				for (var coordgroup = 0; coordgroup < radioButtonCoords.length; coordgroup++)
				{
					for (cg = 2; cg < radioButtonCoords[coordgroup].length; cg = cg + 2)
					{
						drawRIcon(radioButtonCoords[coordgroup][cg-1], radioButtonCoords[coordgroup][cg])
					}
				}
			}
			if (comboCoords.length > 0)
			{
				for (var cbc = 2; cbc < comboCoords.length; cbc = cbc + 3)
				{
					drawComboIcon(comboCoords[cbc-1], comboCoords[cbc])
				}
			}
			if (spinCoords.length > 0)
			{
				for (var sbc = 2; sbc < spinCoords.length; sbc = sbc + 3)
				{
					drawSIcon(spinCoords[sbc-1], spinCoords[sbc])
				}
			}	
		}

		
		//This appends code to the column on the right, in pretty little chunks
		function appendWithLinebreaks(con, div, underWhichDiv)
		{
			var theDiv = document.createElement("div");
			theDiv.setAttribute("id", div)
			for (var c = 0; c < con.length; c++)
			{
				var content = document.createTextNode(con[c] + "--lb--");
				theDiv.appendChild(content);
			}
			var br = document.createTextNode("--lb----lb--");
			theDiv.appendChild(br);
			var where = document.getElementById(underWhichDiv)
			where.appendChild(theDiv);
		}
		
		//This selects all the text in the python code box and copies it to the clipboard
		function selectAllAndCopy()
		{
			document.getElementById("visible_code").select();
			document.execCommand("copy");
		}
		
		//This populates the object list of objects which have been created, at the bottom of the screen.
		//It also dynamically creates 'delete' checkboxes, so users can have delete functionality
		function populateObjectsList()
		{
			if (objectsToMake.length <= 2)
			{
				document.getElementById("deleteAndRedraw").style.display = "none";
			}
				
			document.getElementById("objectHolder").innerHTML = "";
			for (var o = 2; o < objectsToMake.length; o++)
			{
				document.getElementById("objectHolder").innerHTML = document.getElementById("objectHolder").innerHTML + "You made a " + String(objectsToMake[o][0]) + " we will call '" + String(objectsToMake[o][1] + "'    <span style='color:red'>delete:</span>");
				
				var deleteButtonId = "gooobai-" + String(objectsToMake[o][1]);
				existingObjects.push(deleteButtonId);
				
				var deleteThis = document.createElement("INPUT");
				deleteThis.setAttribute("type", "checkbox");
				deleteThis.setAttribute("id", deleteButtonId);
				document.getElementById("objectHolder").appendChild(deleteThis)
				var br = document.createElement("br")
				document.getElementById("objectHolder").appendChild(br)
			}
		}
		
		
		// This function gets called if the user changes the "use a grid" checkbox value on the html page.
		// If it's checked, we set the gridSize value to 10.
		function gridCheckChanged()
		{
			if (document.getElementById('useAGrid').checked == true)
			{
				gridSize = 10;
			}
			else
			{
				gridSize = 1;
			}
		}
		
		//This function gets called when the user clicks the delete and redraw button.
		//It checks if the 'delete' button next to the object is checked or not, then, if it is, removes it from the "Objects to Make" array.
		//Also, if it's a checkbox or radio button, it removes the icon information from the array that holds the icon coordinates for those 2 widgets.
		//Additionally, it finds the <div> associated with the object's python code, and removes the div
		function deleteObjects()
		{
			var withObjectsRemoved = new Array();
			for (var o = 0; o < existingObjects.length; o++)
			{
				if (document.getElementById(existingObjects[o]).checked == false)
				{
					withObjectsRemoved.push(existingObjects[o]);
				} 
				else 
				{ 	
					removeFromObjectsToMake(existingObjects[o].replace("gooobai-", ""));
					removeFromCheckBoxCoords(existingObjects[o].replace("gooobai-", ""));
					removeFromRadioButtonCoords(existingObjects[o].replace("gooobai-", ""));
					removeFromComboCoords(existingObjects[o].replace("gooobai-", ""));
					removeFromSpinCoords(existingObjects[o].replace("gooobai-", ""));
					
					try
					{
						//remove the div with the associated code
						var code = existingObjects[o].replace("gooobai-", "") + "Div"
						document.getElementById(code).remove();
					} catch(err) {}
					
					try
					{
						//remove the div with the associated function
						var funct = existingObjects[o].replace("gooobai-", "") + "Div_function"
						document.getElementById(funct).remove();
					} catch(err) {}
					
					try
					{
						//remove the div with the associated variable
						var vari = existingObjects[o].replace("gooobai-", "") + "Div_variable"
						document.getElementById(vari).remove();	
					} catch(err) {}
				}
			}
			existingObjects = withObjectsRemoved;
			populateObjectsList()
			redrawAfterDeletion()
		}
		
		
		//This removes the object which the user wants to delete from the "Objects To Make" array, so that it will not be re-created upon redrawing of the canvas
		//(it automatically skips the first two objects, because they are the main window and main window header)
		function removeFromObjectsToMake(objectForDeletion)
		{
			var withObjectsRemoved2 = new Array();
			
			withObjectsRemoved2.push(objectsToMake[0])
			withObjectsRemoved2.push(objectsToMake[1])		
		
			for (var o = 2; o < objectsToMake.length; o++)
			{
				if (objectsToMake[o][1] != objectForDeletion)
				{
					withObjectsRemoved2.push(objectsToMake[o])
				}
			}
			objectsToMake = withObjectsRemoved2;
		}
		
		//This array (checkBoxCoords) holds all the coordinates of the checkboxes the user wants to draw on the canvas
		//if an object is deleted, the name of the object is searched for in the checkBoxCoords array.
		//if the name is found, the corresponding x and y coordinates are deleted, so the checkbox icon associated with that particular checkbox won't be re-drawn in the future
		function removeFromCheckBoxCoords(objectForDeletion)
		{
			try
			{
				var withObjectsRemoved3 = new Array();	
			
				for (var o = 0; o < checkBoxCoords.length; o = o+3)
				{
					if (checkBoxCoords[o] != objectForDeletion)
					{
						withObjectsRemoved3.push(checkBoxCoords[o])
						withObjectsRemoved3.push(checkBoxCoords[o+1])
						withObjectsRemoved3.push(checkBoxCoords[o+2])
					}
				}
				checkBoxCoords = withObjectsRemoved3;
			} catch(err) {}
		}	

		//This array (radioButtonCoords) holds all the coordinates of the radiobuttons the user wants to draw on the canvas
		//if an object is deleted, the name of the object is searched for in the radioButtonCoords array.
		//if the name is found, the corresponding x and y coordinates are deleted, so the radio button icons associated with that particular radio button group won't be re-drawn in the future
		function removeFromRadioButtonCoords(objectForDeletion)
		{
			try
			{
				var withObjectsRemoved4 = new Array();	
				for (var coordgroup = 0; coordgroup < radioButtonCoords.length; coordgroup++)
				{
					if (radioButtonCoords[coordgroup][0] != objectForDeletion)
					{
						withObjectsRemoved4.push(radioButtonCoords[coordgroup])
					}
				}
				radioButtonCoords = withObjectsRemoved4;
			} catch(err) {}
		}
		
		//This array (comboCoords) holds all the coordinates of the comboboxes the user wants to draw on the canvas
		//if an object is deleted, the name of the object is searched for in the comboCoords array.
		//if the name is found, the corresponding x and y coordinates are deleted, so the combobox icon associated with that particular combo box won't be re-drawn in the future
		function removeFromComboCoords(objectForDeletion)
		{
			try
			{
				var withObjectsRemoved5 = new Array();	
			
				for (var o = 0; o < comboCoords.length; o = o+3)
				{
					if (comboCoords[o] != objectForDeletion)
					{
						withObjectsRemoved5.push(comboCoords[o])
						withObjectsRemoved5.push(comboCoords[o+1])
						withObjectsRemoved5.push(comboCoords[o+2])
					}
				}
				comboCoords = withObjectsRemoved5;
			} catch(err) {}
		}	
		
		
		//This array (spinCoords) holds all the coordinates of the spin boxes the user wants to draw on the canvas
		//if an object is deleted, the name of the object is searched for in the array.
		//if the name is found, the corresponding x and y coordinates are deleted, so the icon associated with that particular spinbox won't be re-drawn in the future
		function removeFromSpinCoords(objectForDeletion)
		{
			try
			{
				var withObjectsRemoved6 = new Array();	
			
				for (var o = 0; o < spinCoords.length; o = o+3)
				{
					if (spinCoords[o] != objectForDeletion)
					{
						withObjectsRemoved6.push(spinCoords[o])
						withObjectsRemoved6.push(spinCoords[o+1])
						withObjectsRemoved6.push(spinCoords[o+2])
					}
				}
				spinCoords = withObjectsRemoved6;
			} catch(err) {}
		}	
		
		//Here, we use the "Objects To Make" array to re-draw all the objects on the canvas
		function redrawAfterDeletion()
		{
			context.fillStyle = mainWindowBackgroundColor;
			for (var otm = 0; otm < objectsToMake.length; otm++)
			{
				var thisType = objectsToMake[otm][0]
				if (thisType == "mainWindow")
				{
					makeMainWindow(objectsToMake[otm][1], objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4])
				}
				else if (thisType == "mainWindowHeader")
				{
					makeMainWindowHeader(objectsToMake[otm][1], objectsToMake[otm][2], objectsToMake[otm][3])
				}
				else if (thisType == "textInput")
				{
					context.fillStyle = "#FFFFFF";
					makeTextInput(objectsToMake[otm][2], objectsToMake[otm][3])
				}
				else if (thisType == "button")
				{
					context.fillStyle = objectsToMake[otm][5]
					makeButton(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7], objectsToMake[otm][8])
				}
				else if (thisType == "listBox")
				{
					context.fillStyle = objectsToMake[otm][7]
					makeListBox(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7], objectsToMake[otm][8], objectsToMake[otm][9], objectsToMake[otm][10])
				}
				else if (thisType == "label")
				{
					makeLabel(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7])
				}
				else if (thisType == "checkBox")
				{
					context.fillStyle = objectsToMake[otm][5]
					makeCheckBox(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7], objectsToMake[otm][8])
				}
				else if (thisType == "radioButtons")	
				{
					context.fillStyle = objectsToMake[otm][8]
					makeRadioButtons(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7], objectsToMake[otm][8], objectsToMake[otm][9], objectsToMake[otm][10], objectsToMake[otm][11])
				}
				else if (thisType == "progressBar")
				{
					context.fillStyle = objectsToMake[otm][5]
					makeProgressBar(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5])
				}
				else if (thisType == "comboBox")
				{
					context.fillStyle = "#FFFFFF";
					makeComboBox(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7])
				}
				else if (thisType == "spinBox")
				{
					context.fillStyle = objectsToMake[otm][5]
					makeSpinBox(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5], objectsToMake[otm][6], objectsToMake[otm][7], objectsToMake[otm][8])					
				}
				else if (thisType == "picture")
				{
					context.fillStyle = "#FFF000";
					makePicture(objectsToMake[otm][2], objectsToMake[otm][3], objectsToMake[otm][4], objectsToMake[otm][5])
				}
			}
			generateCode();
			drawAllIcons();
			send_to_back()	
		}
		
		// This function snaps our w and h coordinates to a grid
		function snapToGrid(val)
		{
			var snap_candidate = gridSize * Math.floor(val/gridSize);
			if (val-snap_candidate < gridSize) {
				return snap_candidate;
			} 
		};
		
	
		
		
		// These are the functions that draw the objects onto the canvas ------------------------------------------------
		function makeMainWindow(x, y, w, h)
		{								
			context.fillRect(x, y, w, h); 
			context.fillStyle =  '#FFFFFF';
			context.fill();
			
			context.fillRect(x, y-30, w, 30); 
			context.fillStyle = mainWindowBackgroundColor;
			context.fill();		
			
			context.strokeRect(x, y-30, w, h+30);
			context.strokeStyle = '#000000';
			context.stroke();
		}
		function makeTextInput(x, y)
		{
		
			context.fillRect(x, y, 130, 18); 
			context.fillStyle = "#FFFFFF";
			context.fill();			
			context.strokeRect(x, y, 130, 18);
			context.strokeStyle = '#000000';
			context.stroke();
		}
		function makeButton(x, y, buttonText, c, fname, fstyle, fsize)
		{
			//Bug fix, 2020-06-08:  Made button dimensions more in line with what actually appears in Python
			context.font = fstyle + " " + fsize + "px " + fname;
			
			textWidth = context.measureText(buttonText).width + (context.measureText("A").width*2);
			textHeight = context.measureText("A").width * 3;
			
			context.fillRect(x, y, textWidth, textHeight); 
			context.fillStyle = c;
			context.fill();			
			context.strokeRect(x, y, textWidth, textHeight); 
			context.strokeStyle = '#000000';
			context.stroke();
		
			context.strokeText(buttonText, x + context.measureText("A").width, y + context.measureText("A").width * 2);
		}
		
		function makeListBox(x, y, howMany, longestItem, items, c, fname, fstyle, fsize)
		{
			//Bug fix, 2020-06-08:  Made list box dimensions more in line with what actually appears in Python
			context.font = fstyle + " " + fsize + "px " + fname;
			
			textWidth = context.measureText(longestItem).width + 6;
			textHeight = context.measureText("A").width + (context.measureText("A").width/2) + 5; //this plus five is the space between the items in the list box, regardless of text size
			
			context.fillRect(x, y, textWidth, howMany * textHeight); 
			context.fillStyle = c;
			context.fill();
			context.strokeRect(x, y, textWidth, howMany * textHeight); 
			context.strokeStyle = '#000000';
			context.stroke();

			var yForOffset = y + context.measureText("A").width+3
			for (var i = 0; i < items.length; i++)
			{
				var thisItemName = "listBox" + String(i);
				context.strokeText(items[i], x+2, yForOffset);
				yForOffset += textHeight;
			}
		}
		function makeLabel(x, y, labelText, fname, fstyle, fsize)
		{
			context.strokeStyle = '#000000';
			context.font = fstyle + " " + fsize + "px " + fname;
			context.strokeText(labelText, x, y + context.measureText("A").width+3);		
		}
		function makeCheckBox(x, y, checkBoxText, c, fname, fstyle, fsize) //TODO: center check icon vertically in checkbox
		{		
			context.font = fstyle + " " + fsize + "px " + fname;
		
			textWidth = (context.measureText(checkBoxText).width + 20) + 10; // the actual checkbox remains small even if the font is big, so we just add 20 pixels of width here
			textHeight = (context.measureText("A").width * 2) + 10;
			
			context.fillRect(x, y, textWidth, textHeight); 
			context.fillStyle = c;
			context.fill();			
			context.strokeRect(x, y, textWidth, textHeight);
			context.strokeStyle = '#000000';
			context.stroke();
	
			context.strokeText(checkBoxText, x + 20, y + (context.measureText("A").width * 2));	
		}
		function makeRadioButtons(x, y, VorH, howMany, longestItem, stringOfButtons, c, fname, fstyle, fsize) //TODO: compress radio button box, as what was done with listbox
		{
			if (VorH == "left")
			{
				context.font = fstyle + " " + fsize + "px " + fname;
				
				textWidth = context.measureText(stringOfButtons.join()).width + (stringOfButtons.length*30); // the actual button remains small even if the font is big, so we just add 30 pixels of width here
				textHeight = context.measureText("A").width * 2;
				
				context.fillRect(x, y, textWidth, textHeight + 10); 
				context.fillStyle = c;
				context.fill();
				context.strokeRect(x, y, textWidth, textHeight + 10); 
				context.strokeStyle = '#000000';
				context.stroke();
				
				var xOffset = x + 30
				for (var b = 0; b < stringOfButtons.length; b++)
				{
					context.strokeText(stringOfButtons[b], xOffset, y + textHeight);
					xOffset += context.measureText(stringOfButtons[b]).width + 30;
				}
				return [x, y, textWidth, textHeight];
			}
			else
			{
				context.font = fstyle + " " + fsize + "px " + fname;
				
				textWidth = context.measureText(longestItem).width + 30; // the actual button remains small even if the font is big, so we just add 30 pixels of width here
				textHeight = context.measureText("A").width * 2;				
				
				context.fillRect(x, y, textWidth, howMany * (textHeight+10)); 
				context.fillStyle = c;
				context.fill();
				context.strokeRect(x, y, textWidth, howMany * (textHeight+10)); 
				context.strokeStyle = '#000000';
				context.stroke();
				
				var yForOffset = y + textHeight
				for (var b = 0; b < stringOfButtons.length; b++)
				{ 
					context.strokeText(stringOfButtons[b], x+20, yForOffset);
					yForOffset += textHeight + 10
				}
				return [x, y, textWidth, howMany * (textHeight+5)];
			}
			
		}
		function makeMainWindowHeader(x, y, headerText)
		{
			context.fillStyle = "#000000";
			context.font = "12px Arial";
			context.fillText(headerText, x+25, y-10);
			iconX = x+1;
			iconY = y-25;
			drawFIcon(iconX, iconY)
		}
		function makeProgressBar(x, y, w, c)
		{
			
			context.fillRect(x, y, w, 18); 
			context.fillStyle = c;
			context.fill();
			
			context.strokeRect(x, y, w, 18); 
			context.strokeStyle = '#000000';
			context.stroke();
		}
		function makeComboBox(x, y, ww, fname, fstyle, fsize)
		{
			context.font = fstyle + " " + fsize + "px " + fname;
			
			textWidth = ww
			textHeight = context.measureText("A").width + (context.measureText("A").width/2) + 6
			
			context.fillRect(x, y, textWidth, textHeight); 
			context.fillStyle = '#FFFFFF';
			context.fill();			
			context.strokeRect(x, y, textWidth, textHeight); 
			context.strokeStyle = '#000000';
			context.stroke();
		}
		function makeSpinBox(x, y, ww, c, fname, fstyle, fsize)
		{

			context.font = fstyle + " " + fsize + "px " + fname;
			
			textWidth = ww
			textHeight = context.measureText("A").width + (context.measureText("A").width/2) + 6
			
			context.fillRect(x, y, textWidth, textHeight); 
			context.fillStyle = c;
			context.fill();			
			context.strokeRect(x, y, textWidth, textHeight); 
			context.strokeStyle = '#000000';
			context.stroke();
		}
		function makePicture(x, y, w, h)
		{
			context.fillRect(x, y, w, h); 
			context.fillStyle = '#FFF000';
			context.fill();			
			context.strokeRect(x, y, w, h); 
			context.strokeStyle = '#000000';
			context.stroke();
		
			context.strokeText("img", x + 10, y + 10);
		}
		// Those were the functions that draw the objects onto the canvas ------------------------------------------------
		
		//This is the function which draws the little feather icon at the top of the main window
		function drawFIcon(ix, iy)
		{
			feather_icon = new Image();
			feather_icon.src = 'icon.jpeg';
			feather_icon.onload = function(){
				context.drawImage(feather_icon, ix, iy);
			}
		}
		
		//This is the function which draws the checkbox icon
		function drawCIcon(ix, iy)
		{
			checkbox_icon = new Image();
			checkbox_icon.src = 'checkbox.jpeg';
			checkbox_icon.onload = function(){
				context.drawImage(checkbox_icon, ix, iy);
			}
		}
		
		//This is the function which draws the radiobutton icon
		function drawRIcon(ix, iy)
		{
			radiobutton_icon = new Image();
			radiobutton_icon.src = 'radiobutton.jpeg';
			radiobutton_icon.onload = function(){
				context.drawImage(radiobutton_icon, ix, iy);
			}
		}	
		
		//This is the function which draws the combobox icon
		function drawComboIcon(ix, iy)
		{
			combo_icon = new Image();
			combo_icon.src = 'combo.jpeg';
			combo_icon.onload = function(){
				context.drawImage(combo_icon, ix, iy);
			}
		}

		//This is the function which draws the spinbox icon
		function drawSIcon(ix, iy)
		{
			spin_icon = new Image();
			spin_icon.src = 'spin.jpeg';
			spin_icon.onload = function(){
				context.drawImage(spin_icon, ix, iy);
			}
		}		
		
		//After a user draws a main window, the "Main Window" tool has to be removed from the drop-down toolbox.  This function removes it.
		function removeMainWindowTool()
		{
			var s = document.getElementById("selector");
			s.remove(s.selectedIndex);
			s.value = "---";
			
			var toolz = document.getElementById("selector").getElementsByTagName("option");
			for (var i = 0; i < toolz.length; i++) {
				toolz[i].disabled = false; 
			}
		}
		
		//This checks the characters input into certain input fields, to make sure they have no spaces or punctuation, or certain keywords
		function checkChars()
		{
			var badOnes = [" ", "'", "\"", ".", ",", "!", "?", "*", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
			var inputsToCheck = document.getElementsByClassName('wFilter');
			for (var i = 0; i < inputsToCheck.length; i++)
			{
				var thisValue = inputsToCheck[i].value;
				for (var c = 0; c < badOnes.length; c++)
				{	
					if (thisValue.indexOf(badOnes[c]) > -1)
					{
						alert("If this field contains punctuation, spaces, or numbers the python code will not work correctly.  Please don't use spaces or punctuation in this field.")
						inputsToCheck[i].value = "";
						break;
					}
				}
			}
		}
		
		//This checks the characters input into certain input fields, to make sure they have only numbers
		function checkNums()
		{
			var inputsToCheck = document.getElementsByClassName('justNums');
			for (var i = 0; i < inputsToCheck.length; i++)
			{
				var thisValue = inputsToCheck[i].value;
				if ((Number.isInteger(parseInt(thisValue)) == false) && (thisValue != "NaN") && (thisValue.length > 0))
				{
					alert("Please input only numbers into this field.")
					inputsToCheck[i].value = "";
					break;
				}
			}
		}		
		
		
		//This copies the code from the invisible holding div to the textarea
		function generateCode() 
		{
			document.getElementById("visible_code").innerHTML = "";
			
			var contentss = document.getElementById("full_code").innerText;
			var contents = contentss.split("--lb--")
			for (var line = 0; line < contents.length; line++)
			{
				if (contents[line].indexOf("--tab--") > -1)
				{
					document.getElementById("visible_code").innerHTML = document.getElementById("visible_code").innerHTML + "\t" + contents[line].split("--tab--")[1] + "\n"
				}
				else
				{
					document.getElementById("visible_code").innerHTML = document.getElementById("visible_code").innerHTML + contents[line] + "\n"
				}
			}
		}
		
		//This function actually writes the python code into the python code area
		function MakeObject(coords, tooltype, divID, fname, fstyle, fsize)
		{

			var x = coords[0], y = coords[1], w = coords[2], h = coords[3];
			var con = new Array();
			if (tooltype == "mainWindow")
			{	
				con.push("# This is the section of code which creates the main window");
				con.push("root.geometry('" + w + "x" + h + "')");
				con.push("root.configure(background='" + color + "')");
				con.push("root.title('" + document.getElementById("textForButtonOrLabel").value.replace(/\'/g, "\\'").replace(/\"/g, "\\'")  + "')");
				appendWithLinebreaks(con, divID, "code_area")
				if (offsetX == -1000)
				{
					offsetX = x;
					offsetY = y;
				}
			}
			else if (tooltype == "textInput")
			{
				con.push("# This is the section of code which creates a text input box");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("textInputName").value + "=Entry(root)");
				con.push(document.getElementById("textInputName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function to get the user input from the text input box")
				con.push("def getInputBoxValue():");
				con.push("--tab--userInput = " + document.getElementById("textInputName").value + ".get()");
				con.push("--tab--return userInput");
				appendWithLinebreaks(con, divID + "_function", "function_area");
			}
			else if (tooltype == "button")
			{
				con.push("# This is the section of code which creates a button");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push("Button(root, text='" + document.getElementById("textForButtonOrLabel").value.replace(/\'/g, "\\'").replace(/\"/g, "\\'") + "', bg='" + color + "', font=('" + fname + "', " + fsize + ", '" + fstyle + "'), command=" + document.getElementById("function").value + ").place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is the function called when the button is clicked");
				con.push("def " + document.getElementById("function").value + "():");
				con.push("--tab--print('clicked')");
				appendWithLinebreaks(con, divID + "_function", "function_area");
			}
			else if (tooltype == "label")
			{
				con.push("# This is the section of code which creates the a label");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push("Label(root, text='" + document.getElementById("textForButtonOrLabel").value.replace(/\'/g, "\\'").replace(/\"/g, "\\'") + "', bg='" + mainWindowBackgroundColor + "', font=('" + fname + "', " + fsize + ", '" + fstyle + "')).place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
			}
			else if (tooltype == "listBox")
			{
				con.push("# This is the section of code which creates a listbox");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("listBoxName").value + "=Listbox(root, bg='" + color + "', font=('" + fname + "', " + fsize + ", '" + fstyle + "'), width=0, height=0)");
				var howMany = document.getElementById("numberOfListBoxItems").value;
				for (var i = 0; i < howMany; i++)
				{
					var thisItemName = "listBox" + String(i);
					var thisItem = document.getElementById(thisItemName).value
					if (thisItem == "") { break; }
					con.push(document.getElementById("listBoxName").value + ".insert('" + i + "', '" + thisItem + "')")
				}
				document.getElementById('listBoxItems').innerHTML = "";
				con.push(document.getElementById("listBoxName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function to get the selected list box value")
				con.push("def getListboxValue():");
				con.push("--tab--itemSelected = " + document.getElementById("listBoxName").value + ".curselection()");
				con.push("--tab--return itemSelected");
				appendWithLinebreaks(con, divID + "_function", "function_area");
			}
			else if (tooltype == "radioButtons")
			{
				con.push("# This is the section of code which creates a group of radio buttons");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push("frame=Frame(root, width=0, height=0, bg='" + color + "')");
				con.push("frame.place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				con.push("ARBEES=[");
				
				
				var howMany = document.getElementById("numberOfRadioButtons").value;
				for (var i = 0; i < howMany; i++)
				{
					var thisItemName = "radioButton" + String(i);
					var thisItemValue = "radioButtonValue" + String(i);
					var b = document.getElementById(thisItemName).value
					var v = document.getElementById(thisItemValue).value
					if (b == "") { break; }
					con.push("('" + b + "', '" + v + "'), ");
				}
				document.getElementById('radioButtonItems').innerHTML = "";

				con.push("]")
				con.push("for text, mode in ARBEES:")
				con.push("--tab--" + document.getElementById("buttonGroupName").value + "=Radiobutton(frame, text=text, variable=" + document.getElementById("buttonVar").value + ", value=mode, bg='" + color + "', font=('" + fname + "', " + fsize + ", '" + fstyle + "')).pack(side='" + document.querySelector('input[name="HorV"]:checked').value + "', anchor = 'w')");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function to get the selected radio button value");
				con.push("def getRadioButtonValue():");
				con.push("--tab--buttonSelected = " + document.getElementById("buttonVar").value + ".get()");
				con.push("--tab--return buttonSelected");
				appendWithLinebreaks(con, divID + "_function", "function_area");
				
				con = [];
				con.push("#this is the declaration of the variable associated with the radio button group");
				con.push(document.getElementById("buttonVar").value + " = tk." + document.querySelector('input[name="RadioSorI"]:checked').value + "Var()");
				appendWithLinebreaks(con, divID + "_variable", "variable_area");
				
			}
			else if (tooltype == "checkBox")
			{
				con.push("# This is the section of code which creates a checkbox");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("checkBoxName").value + "=Checkbutton(root, text='" + document.getElementById("checkBoxText").value.replace(/\'/g, "\\'").replace(/\"/g, "\\'") + "', variable=" + document.getElementById("checkBoxVar").value + ", bg='" + color + "', font=('" + fname + "', " + fsize + ", '" + fstyle + "'))");
				con.push(document.getElementById("checkBoxName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function to check the status of the checkbox (1 means checked, and 0 means unchecked)");
				con.push("def getCheckboxValue():");
				con.push("--tab--checkedOrNot = " + document.getElementById("checkBoxVar").value + ".get()");
				con.push("--tab--return checkedOrNot");
				appendWithLinebreaks(con, divID + "_function", "function_area");
				
				con = [];
				con.push("#this is the declaration of the variable associated with the checkbox");
				con.push(document.getElementById("checkBoxVar").value + " = tk.IntVar()");
				appendWithLinebreaks(con, divID + "_variable", "variable_area");
			}
			else if (tooltype == "progressBar")
			{
				con.push("# This is the section of code which creates a color style to be used with the progress bar");
				con.push(document.getElementById("progressBarName").value + "_style = ttk.Style()")
				con.push(document.getElementById("progressBarName").value + "_style.theme_use('clam')");
				con.push(document.getElementById("progressBarName").value + "_style.configure('" + document.getElementById("progressBarName").value + ".Horizontal.TProgressbar', foreground='" + color + "', background='" + color + "')");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# This is the section of code which creates a progress bar");
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("progressBarName").value + "=ttk.Progressbar(root, style='" + document.getElementById("progressBarName").value + ".Horizontal.TProgressbar', orient='horizontal', length=" + w + ", mode='determinate', maximum=" + + document.getElementById("pbMaxValue").value + ", value=1)");
				con.push(document.getElementById("progressBarName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# This is a function which increases the progress bar value by the given increment amount");
				con.push("def makeProgress():");
				con.push("--tab--" + document.getElementById("progressBarName").value +"['value']=" + document.getElementById("progressBarName").value + "['value'] + " + document.getElementById("pbIncrements").value);
				con.push("--tab--root.update_idletasks()");
				appendWithLinebreaks(con, divID + "_function", "function_area");
			}
			else if (tooltype == "comboBox")
			{

				var comboBoxValues = "";
				var howMany = document.getElementById("numberOfComboBoxItems").value;
				for (var i = 0; i < howMany; i++)
				{
					var thisItemName = "comboBox" + String(i);
					var thisItem = document.getElementById(thisItemName).value
					if (thisItem == "") { break; }
					comboBoxValues = comboBoxValues + "'" + document.getElementById(thisItemName).value + "', "
				}
				comboBoxValues = comboBoxValues.substring(0, comboBoxValues.length - 2);
				document.getElementById('comboBoxItems').innerHTML = "";
				
				con.push("# This is the section of code which creates a combo box")
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("comboBoxName").value + "= ttk.Combobox(root, values=[" + comboBoxValues + "], font=('" + fname + "', " + fsize + ", '" + fstyle + "'), width=" + w + ")");
				con.push(document.getElementById("comboBoxName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				con.push(document.getElementById("comboBoxName").value + ".current(1)");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function which returns the selected combo box item");
				con.push("def getSelectedComboItem():");
				con.push("--tab--return " + document.getElementById("comboBoxName").value + ".get()");
				appendWithLinebreaks(con, divID + "_function", "function_area");
			}
			else if (tooltype == "spinBox")
			{
				con.push("# This is the section of code which creates a spin box")
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;
				con.push(document.getElementById("spinBoxName").value + "= Spinbox(root, from_=" + document.getElementById("sbMinValue").value + ", to=" + document.getElementById("sbMaxValue").value + ", font=('" + fname + "', " + fsize + ", '" + fstyle + "'), bg = '" + color + "', width=" + w + ")");
				con.push(document.getElementById("spinBoxName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
				
				con = [];
				con.push("# this is a function which returns the selected spin box value");
				con.push("def getSelectedSpinBoxValue():");
				con.push("--tab--return " + document.getElementById("spinBoxName").value + ".get()");
				appendWithLinebreaks(con, divID + "_function", "function_area");	
			}				
			else if (tooltype == "picture")
			{
				var thisOffsetX = x - offsetX;
				var thisOffsetY = y - offsetY;	
				con.push("# First, we create a canvas to put the picture on")
				con.push(document.getElementById("pictureName").value + "= Canvas(root, height=" + coords[2] + ", width=" + coords[3] + ")");
				con.push("# Then, we actually create the image file to use (it has to be a *.gif)");
				con.push("picture_file = PhotoImage(file = '')  # <-- you will have to copy-paste the filepath here, for example 'C:\\Desktop\\pic.gif'")
				con.push("# Finally, we create the image on the canvas and then place it onto the main window");
				con.push(document.getElementById("pictureName").value + ".create_image(" + coords[2] + ", 0, anchor=NE, image=picture_file)");
				con.push(document.getElementById("pictureName").value + ".place(x=" + thisOffsetX  + ", y=" + thisOffsetY + ")");
				appendWithLinebreaks(con, divID, "code_area")
			}
			generateCode();
		};
		
		init();
		
		}, false); }