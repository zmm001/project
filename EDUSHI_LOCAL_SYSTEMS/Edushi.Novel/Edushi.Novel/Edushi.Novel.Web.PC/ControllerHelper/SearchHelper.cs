�}�� r �   ��D�yd���a	���#^���}ꬱ�����V8c�z�N3����e�|-(@ �~~69�Ouw S��������	4biݲ��c��륬�O��c`��_�z$NDC\E�$i�oo���gK|}?�;T��0��	J�`�՚��x�Qxp�C���Y�߸a�����*F���L��l��v�L��ѣ�������z��[�L/]]/�Q�}���d��L���&��餰�����쟖M9�O��Y�~��Dhk��D�)���}���!�#H������ ѣ/��<�w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�dexRecommendListForSearch(count);
        }
        public static List<BookInfoModel> GetSearchList(string kw)
        {
            var result = _bookService.Search(kw);
            if (result != null && result.Any())
            {
                return result;
            }
            else
            {
                return null;
            }
        }
    }
}