�}6� r �  v4��<l2��a	��W��_���}�n��S
���爭aA�Cyqp��%��G��~��u���ۍ\3�Sw	46��k�ٷ���&K�m�K}�5[S���+��gI�`�=�t�k��^��9\�ں�jj��\ԕ�^�J5抨]�5:��_M��� ���j�T2f�������&%c�Ee#Λm���j �̋����r@��)/����_<��$���I�X4IVR6�Z�Z+�*q��C�{�y�x�+:�Xg�\M�����&u��sו���}�bŰ����c�x֋�I{��Gm�,"{���Q����܅��w}�Vo�Rfuޤh���6o�S��.7�.�O�hh�;Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�lD$9��������1Q���dV5��\_�����;O��a�g<�?4�/v߳O�t��7h.�
[]z�ۉ�M��<�SV�m�!���s�B}g�4EB͊��$r��ĺT��Uۈ�ru@H���V�Е=/b|-�|K*R����p��Ē9�W����X����G�Ů�����d����Q^[��J��:�ֱ?F�N��wz8�Y�T��r�n�.���|�Rᛣב�[�Ǚ�����]��Xjd��2��V8c�݆$�
���jQ/�C�9l'}�ZpNꍐ�����d'	��
��#JٯM~�P#[	!I���/�Dr�(y�堍-$�v���m�T���Q(�>�K�g�Erv^���\��8p�NP:�y�&m_]��geب
s��4xφ�l�kU?m�Ze��;�
���PW�]B��e�e����<�]��?i��=�K}1_F�YB�n��^�\���<ε�=�5f�K��b݋R�0�o����]�S������Collection.
        /// </summary>
        /// <typeparam name="T">The type of the returned documents.</typeparam>
        /// <param name="collection">The name of the collection.</param>
        /// <returns>An instance of IQueryable{{T}} for a MongoCollection.</returns>
        public static IQueryable<T> AsQueryable<T>(this MongoCollection collection)
        {
            var provider = new MongoQueryProvider(collection);
            return new MongoQueryable<T>(provider);
        }
    }
}
